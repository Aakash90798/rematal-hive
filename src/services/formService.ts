import { supabase } from "@/lib/supabase";
import { ApplicationFormState, Niche, ServiceCategory, ServiceSubcategory, Tool, ReferralSource } from "@/types/form";

/**
 * Fetches niches from the database
 */
export const fetchNiches = async (): Promise<Niche[]> => {
  try {
    const { data, error } = await supabase
      .from('niches')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching niches:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching niches:', error);
    return [];
  }
};

/**
 * Fetches service categories from the database
 */
export const fetchServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching service categories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching service categories:', error);
    return [];
  }
};

/**
 * Fetches service subcategories for a given category
 */
export const fetchSubcategoriesForCategory = async (categoryId: string): Promise<ServiceSubcategory[]> => {
  try {
    const { data, error } = await supabase
      .from('service_subcategories')
      .select('*')
      .eq('service_category_id', categoryId)
      .order('name');
    
    if (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching subcategories:', error);
    return [];
  }
};

/**
 * Fetches tools for a given category
 */
export const fetchToolsForCategory = async (categoryId: string): Promise<Tool[]> => {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('service_category_id', categoryId)
      .order('name');
    
    if (error) {
      console.error('Error fetching tools:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching tools:', error);
    return [];
  }
};

/**
 * Fetches referral sources
 */
export const fetchReferralSources = async (): Promise<ReferralSource[]> => {
  try {
    const { data, error } = await supabase
      .from('referral_sources')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching referral sources:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching referral sources:', error);
    return [];
  }
};

/**
 * Marks a user as rejected and records the rejection date
 */
export const markUserAsRejected = async (formState: ApplicationFormState) => {
  try {
    await supabase
      .from('freelancers')
      .insert({
        user_id: supabase.auth.getUser().then(({ data }) => data.user?.id),
        has_ecommerce_experience: false,
        years_of_experience: '',
        last_rejected_date: new Date().toISOString(),
        application_status: 'rejected'
      });
    
    return { success: true };
  } catch (error) {
    console.error('Error marking user as rejected:', error);
    return { success: false, message: 'Failed to update user status' };
  }
};

/**
 * Submits the application form data to the database
 */
export const submitApplication = async (formState: ApplicationFormState): Promise<{ success: boolean; message?: string; userId?: string }> => {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }
    
    // Update user information
    const { error: userError } = await supabase
      .from('users')
      .update({
        first_name: formState.firstName,
        last_name: formState.lastName,
        mobile_no: formState.mobileNo,
        city: formState.city,
        referral_source_id: formState.referralSourceId || null
      })
      .eq('id', user.id);

    if (userError) {
      console.error('Error updating user information:', userError);
      return { success: false, message: 'Failed to update user information' };
    }

    // Check if freelancer record already exists
    const { data: existingFreelancer } = await supabase
      .from('freelancers')
      .select('id')
      .eq('user_id', user.id)
      .single();

    let freelancerId;

    if (existingFreelancer) {
      // Update existing freelancer record
      const { error: updateError } = await supabase
        .from('freelancers')
        .update({
          has_ecommerce_experience: formState.hasExperience,
          years_of_experience: formState.yearsOfExperience,
          linkedin_url: formState.linkedinUrl,
          portfolio_url: formState.portfolioUrl,
          more_info: formState.moreInfo,
          skills_tools_requested: formState.skillsToolsRequested,
          application_status: 'pending'
        })
        .eq('id', existingFreelancer.id);

      if (updateError) {
        console.error('Error updating freelancer information:', updateError);
        return { success: false, message: 'Failed to update freelancer information' };
      }

      freelancerId = existingFreelancer.id;
    } else {
      // Create new freelancer record
      const { data: newFreelancer, error: insertError } = await supabase
        .from('freelancers')
        .insert({
          user_id: user.id,
          has_ecommerce_experience: formState.hasExperience,
          years_of_experience: formState.yearsOfExperience,
          linkedin_url: formState.linkedinUrl,
          portfolio_url: formState.portfolioUrl,
          more_info: formState.moreInfo,
          skills_tools_requested: formState.skillsToolsRequested,
          application_status: 'pending'
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating freelancer record:', insertError);
        return { success: false, message: 'Failed to create freelancer record' };
      }

      freelancerId = newFreelancer?.id;
    }

    // Process niches
    if (formState.selectedNicheIds && formState.selectedNicheIds.length > 0) {
      // First clear existing niches
      await supabase
        .from('freelancer_niches')
        .delete()
        .eq('freelancer_id', freelancerId);

      // Then insert new niches
      const nicheInserts = formState.selectedNicheIds.map(nicheId => ({
        freelancer_id: freelancerId,
        niche_id: nicheId
      }));

      const { error: nichesError } = await supabase
        .from('freelancer_niches')
        .insert(nicheInserts);

      if (nichesError) {
        console.error('Error saving niches:', nichesError);
      }
    }

    // Process service category
    if (formState.selectedServiceCategoryId) {
      // First clear existing categories
      await supabase
        .from('freelancer_service_categories')
        .delete()
        .eq('freelancer_id', freelancerId);

      // Then insert new category
      const { error: categoryError } = await supabase
        .from('freelancer_service_categories')
        .insert({
          freelancer_id: freelancerId,
          service_category_id: formState.selectedServiceCategoryId
        });

      if (categoryError) {
        console.error('Error saving service category:', categoryError);
      }
    }

    // Process subcategories
    if (formState.selectedSubcategoryIds && formState.selectedSubcategoryIds.length > 0) {
      // First clear existing subcategories
      await supabase
        .from('freelancer_service_subcategories')
        .delete()
        .eq('freelancer_id', freelancerId);

      // Then insert new subcategories
      const subcategoryInserts = formState.selectedSubcategoryIds.map(subcategoryId => ({
        freelancer_id: freelancerId,
        service_subcategory_id: subcategoryId
      }));

      const { error: subcategoriesError } = await supabase
        .from('freelancer_service_subcategories')
        .insert(subcategoryInserts);

      if (subcategoriesError) {
        console.error('Error saving subcategories:', subcategoriesError);
      }
    }

    // Process tools
    if (formState.selectedToolIds && formState.selectedToolIds.length > 0) {
      // First clear existing tools
      await supabase
        .from('freelancer_tools')
        .delete()
        .eq('freelancer_id', freelancerId);

      // Then insert new tools
      const toolInserts = formState.selectedToolIds.map(toolId => ({
        freelancer_id: freelancerId,
        tool_id: toolId
      }));

      const { error: toolsError } = await supabase
        .from('freelancer_tools')
        .insert(toolInserts);

      if (toolsError) {
        console.error('Error saving tools:', toolsError);
      }
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
};

/**
 * Checks if a user has already applied
 */
export const checkApplicationStatus = async (userId: string) => {
  if(!userId) {
    return { status: null, rejectedDate: null };
  }

  const { data, error } = await supabase
    .from('freelancers')
    .select('application_status, last_rejected_date')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    //console.error('Error checking application status:', error);
    return { status: null, rejectedDate: null };
  }
  
  return { 
    status: data?.application_status || null,
    rejectedDate: data?.last_rejected_date || null
  };
};
