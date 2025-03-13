
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface VideoInterviewPayload {
  jobID: number;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  shareableURL: string;
  submittedOn: string;
  currentStage: string;
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Get API key from request headers
    const apiKey = req.headers.get('x-api-key');
    
    if (!apiKey || apiKey !== Deno.env.get('WEBHOOK_API_KEY')) {
      return new Response(
        JSON.stringify({ success: false, message: 'Unauthorized: Invalid API key' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Parse request body
    const reqData: VideoInterviewPayload = await req.json();
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { applicantEmail } = reqData;
    
    // Validate required fields
    if (!applicantEmail) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required field: applicantEmail' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Get user by email from auth.users
    const { data: userData, error: userError } = await supabase.auth
      .admin
      .listUsers();
      
    if (userError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error fetching users',
          error: userError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Find user with matching email
    const foundUser = userData.users.find(u => u.email === applicantEmail);
    
    if (!foundUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'User not found with provided email'
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const userId = foundUser.id;
    
    // Get freelancer by user ID
    const { data: freelancerData, error: freelancerError } = await supabase
      .from('freelancers')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (freelancerError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error fetching freelancer data',
          error: freelancerError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (!freelancerData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Freelancer not found for this user'
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Check if video interview response already exists for this user
    const { data: existingResponse, error: checkError } = await supabase
      .from('video_interview_responses')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking existing response:', checkError);
    }
    
    let responseOperation;
    
    if (existingResponse) {
      // Update existing response
      responseOperation = supabase
        .from('video_interview_responses')
        .update({
          jobID: reqData.jobID,
          jobTitle: reqData.jobTitle,
          applicantName: reqData.applicantName,
          applicantEmail: reqData.applicantEmail,
          shareableURL: reqData.shareableURL,
          submittedOn: reqData.submittedOn,
          currentStage: reqData.currentStage
        })
        .eq('id', userId);
    } else {
      // Create new response
      responseOperation = supabase
        .from('video_interview_responses')
        .insert({
          id: userId, // Use the user's ID as the primary key
          jobID: reqData.jobID,
          jobTitle: reqData.jobTitle,
          applicantName: reqData.applicantName,
          applicantEmail: reqData.applicantEmail,
          shareableURL: reqData.shareableURL,
          submittedOn: reqData.submittedOn,
          currentStage: reqData.currentStage
        });
    }
    
    const { error: responseError } = await responseOperation;
    
    if (responseError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to save video interview response',
          error: responseError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Update freelancer status if currentStage is "submitted"
    if (reqData.currentStage === "submitted") {
      const { error: updateError } = await supabase
        .from('freelancers')
        .update({ application_status: 'PENDING' })
        .eq('id', freelancerData.id);
      
      if (updateError) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Failed to update freelancer status',
            error: updateError.message
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Video interview response recorded successfully' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    // Handle errors
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
