
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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
    const reqData = await req.json();
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Extract data from request
    const { 
      email,
      about_freelancer,
      recent_experience,
      challenge_solved,
      what_seperates_avg
    } = reqData;
    
    // Validate required fields
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields: email' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Get user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    
    if (userError || !userData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'User not found with provided email',
          error: userError?.message
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Get freelancer by user ID
    const { data: freelancerData, error: freelancerError } = await supabase
      .from('freelancers')
      .select('id')
      .eq('user_id', userData.id)
      .maybeSingle();
    
    if (freelancerError || !freelancerData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Freelancer not found for this user',
          error: freelancerError?.message
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Create new video interview response
    const { data: responseData, error: responseError } = await supabase
      .from('video_interview_responses')
      .insert({
        about_freelancer,
        recent_experience,
        challenge_solved,
        what_seperates_avg
      })
      .select()
      .single();
    
    if (responseError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to create video interview response',
          error: responseError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Update freelancer's video interview response ID
    const { error: updateError } = await supabase
      .from('freelancers')
      .update({ video_interview_response_id: responseData.id })
      .eq('id', freelancerData.id);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to update freelancer with video response ID',
          error: updateError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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
