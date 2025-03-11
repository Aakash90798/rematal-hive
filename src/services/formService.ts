
import { supabase } from '@/lib/supabase';
import { ApplicationFormState, Niche, ServiceCategory, ServiceCategoryWithRelations, ServiceSubcategory, Tool, ReferralSource } from '@/types/form';

// Fetch all niches
export async function fetchNiches(): Promise<Niche[]> {
  const { data, error } = await supabase
    .from('niches')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching niches:', error);
    return [];
  }
  
  return data as Niche[];
}

// Fetch all service categories with their subcategories and tools
export async function fetchServiceCategories(): Promise<ServiceCategoryWithRelations[]> {
  const { data: categories, error: categoriesError } = await supabase
    .from('service_categories')
    .select('*')
    .order('name');
  
  if (categoriesError) {
    console.error('Error fetching service categories:', categoriesError);
    return [];
  }
  
  const result: ServiceCategoryWithRelations[] = [];
  
  for (const category of categories) {
    // Fetch subcategories for this category
    const { data: subcategoriesData, error: subcategoriesError } = await supabase
      .from('service_category_subcategories')
      .select(`
        service_subcategories!inner(*)
      `)
      .eq('service_category_id', category.id);
    
    if (subcategoriesError) {
      console.error(`Error fetching subcategories for category ${category.id}:`, subcategoriesError);
      continue;
    }
    
    // Fetch tools for this category
    const { data: toolsData, error: toolsError } = await supabase
      .from('service_category_tools')
      .select(`
        tools!inner(*)
      `)
      .eq('service_category_id', category.id);
    
    if (toolsError) {
      console.error(`Error fetching tools for category ${category.id}:`, toolsError);
      continue;
    }
    
    // Extract and map the subcategories and tools properly
    // Console log the first item to understand its structure
    if (subcategoriesData.length > 0) {
      console.log('First subcategory item structure:', JSON.stringify(subcategoriesData[0], null, 2));
    }
    if (toolsData.length > 0) {
      console.log('First tool item structure:', JSON.stringify(toolsData[0], null, 2));
    }
    
    // Correctly map the nested data structure
    const subcategories: ServiceSubcategory[] = subcategoriesData.map(item => ({
      id: item.service_subcategories.id,
      name: item.service_subcategories.name
    }));
    
    const tools: Tool[] = toolsData.map(item => ({
      id: item.tools.id,
      name: item.tools.name
    }));
    
    result.push({
      ...category,
      subcategories,
      tools
    });
  }
  
  return result;
}

// Fetch service subcategories for a specific category
export async function fetchSubcategoriesForCategory(categoryId: string): Promise<ServiceSubcategory[]> {
  const { data, error } = await supabase
    .from('service_category_subcategories')
    .select(`
      service_subcategories!inner(*)
    `)
    .eq('service_category_id', categoryId);
  
  if (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    return [];
  }
  
  // Log the first item to understand its structure
  if (data.length > 0) {
    console.log('Subcategory data structure:', JSON.stringify(data[0], null, 2));
  }
  
  // Properly extract and map the subcategories
  return data.map(item => ({
    id: item.service_subcategories.id,
    name: item.service_subcategories.name
  }));
}

// Fetch tools for a specific category
export async function fetchToolsForCategory(categoryId: string): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('service_category_tools')
    .select(`
      tools!inner(*)
    `)
    .eq('service_category_id', categoryId);
  
  if (error) {
    console.error(`Error fetching tools for category ${categoryId}:`, error);
    return [];
  }
  
  // Log the first item to understand its structure
  if (data.length > 0) {
    console.log('Tool data structure:', JSON.stringify(data[0], null, 2));
  }
  
  // Properly extract and map the tools
  return data.map(item => ({
    id: item.tools.id,
    name: item.tools.name
  }));
}

// Fetch all referral sources
export async function fetchReferralSources(): Promise<ReferralSource[]> {
  const { data, error } = await supabase
    .from('referral_sources')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching referral sources:', error);
    return [];
  }
  
  return data as ReferralSource[];
}

// Check if email already exists and if they were rejected recently
export async function checkEmailStatus(email: string): Promise<{ exists: boolean, recentlyRejected: boolean }> {
  // Check if the email exists in the database
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  
  if (userError) {
    console.error('Error checking user email:', userError);
    return { exists: false, recentlyRejected: false };
  }
  
  // If user doesn't exist, they can apply
  if (!users) {
    return { exists: false, recentlyRejected: false };
  }
  
  // Check if they were rejected in the last 90 days
  const { data: freelancer, error: freelancerError } = await supabase
    .from('freelancers')
    .select('last_rejected_date')
    .eq('user_id', users.id)
    .maybeSingle();
  
  if (freelancerError) {
    console.error('Error checking freelancer rejection status:', freelancerError);
    return { exists: true, recentlyRejected: false };
  }
  
  if (!freelancer || !freelancer.last_rejected_date) {
    return { exists: true, recentlyRejected: false };
  }
  
  // Check if rejection was within last 90 days
  const rejectionDate = new Date(freelancer.last_rejected_date);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  return {
    exists: true,
    recentlyRejected: rejectionDate > ninetyDaysAgo
  };
}

// Submit the application form
export async function submitApplication(formData: ApplicationFormState): Promise<{ success: boolean, message: string, userId?: string }> {
  try {
    // Start a transaction by inserting the user first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        mobile_no: formData.mobileNo,
        city: formData.city,
        referral_source_id: formData.referralSourceId || null
      })
      .select()
      .single();
    
    if (userError) {
      console.error('Error inserting user:', userError);
      return { success: false, message: 'Failed to submit your application. Please try again.' };
    }
    
    // Now insert the freelancer record
    const { data: freelancerData, error: freelancerError } = await supabase
      .from('freelancers')
      .insert({
        user_id: userData.id,
        years_of_experience: formData.yearsOfExperience!,
        linkedin_url: formData.linkedinUrl,
        portfolio_url: formData.portfolioUrl,
        has_ecommerce_experience: formData.hasEcommerceExperience!
      })
      .select()
      .single();
    
    if (freelancerError) {
      console.error('Error inserting freelancer:', freelancerError);
      return { success: false, message: 'Failed to submit your application. Please try again.' };
    }
    
    // Add niches
    if (formData.selectedNicheIds.length > 0) {
      const nicheInserts = formData.selectedNicheIds.map(nicheId => ({
        freelancer_id: freelancerData.id,
        niche_id: nicheId
      }));
      
      const { error: nichesError } = await supabase
        .from('freelancer_niches')
        .insert(nicheInserts);
      
      if (nichesError) {
        console.error('Error inserting niches:', nichesError);
      }
    }
    
    // Add service category
    if (formData.selectedServiceCategoryId) {
      const { error: categoryError } = await supabase
        .from('freelancer_service_categories')
        .insert({
          freelancer_id: freelancerData.id,
          service_category_id: formData.selectedServiceCategoryId
        });
      
      if (categoryError) {
        console.error('Error inserting service category:', categoryError);
      }
    }
    
    // Add subcategories
    if (formData.selectedSubcategoryIds.length > 0) {
      const subcategoryInserts = formData.selectedSubcategoryIds.map(subcategoryId => ({
        freelancer_id: freelancerData.id,
        service_subcategory_id: subcategoryId
      }));
      
      const { error: subcategoriesError } = await supabase
        .from('freelancer_service_subcategories')
        .insert(subcategoryInserts);
      
      if (subcategoriesError) {
        console.error('Error inserting subcategories:', subcategoriesError);
      }
    }
    
    // Add tools
    if (formData.selectedToolIds.length > 0) {
      const toolInserts = formData.selectedToolIds.map(toolId => ({
        freelancer_id: freelancerData.id,
        tool_id: toolId
      }));
      
      const { error: toolsError } = await supabase
        .from('freelancer_tools')
        .insert(toolInserts);
      
      if (toolsError) {
        console.error('Error inserting tools:', toolsError);
      }
    }
    
    return {
      success: true,
      message: 'Your application has been submitted successfully!',
      userId: userData.id
    };
    
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

// Mark user as rejected
export async function markUserAsRejected(email: string): Promise<boolean> {
  try {
    // Find the user by email
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    
    if (userError || !user) {
      console.error('Error finding user to mark as rejected:', userError);
      return false;
    }
    
    // Find and update the freelancer record
    const { data: freelancer, error: freelancerSelectError } = await supabase
      .from('freelancers')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (freelancerSelectError) {
      console.error('Error finding freelancer to mark as rejected:', freelancerSelectError);
      return false;
    }
    
    // If freelancer doesn't exist yet, create one with rejected status
    if (!freelancer) {
      const { error: createError } = await supabase
        .from('freelancers')
        .insert({
          user_id: user.id,
          has_ecommerce_experience: false,
          years_of_experience: 'less than 1 yr',
          last_rejected_date: new Date().toISOString()
        });
      
      if (createError) {
        console.error('Error creating rejected freelancer:', createError);
        return false;
      }
    } else {
      // Update existing freelancer with rejection date
      const { error: updateError } = await supabase
        .from('freelancers')
        .update({ last_rejected_date: new Date().toISOString() })
        .eq('id', freelancer.id);
      
      if (updateError) {
        console.error('Error updating freelancer rejection date:', updateError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error marking user as rejected:', error);
    return false;
  }
}
