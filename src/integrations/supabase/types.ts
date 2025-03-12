export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      freelancer_niches: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          niche_id: string
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          niche_id: string
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          niche_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_niches_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_niches_niche_id_fkey"
            columns: ["niche_id"]
            isOneToOne: false
            referencedRelation: "niches"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_service_categories: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          service_category_id: string
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          service_category_id: string
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          service_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_service_categories_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_service_categories_service_category_id_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_service_subcategories: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          service_subcategory_id: string
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          service_subcategory_id: string
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          service_subcategory_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_service_subcategories_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_service_subcategories_service_subcategory_id_fkey"
            columns: ["service_subcategory_id"]
            isOneToOne: false
            referencedRelation: "service_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_tools: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          tool_id: string
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_tools_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_tools_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancers: {
        Row: {
          created_at: string | null
          has_ecommerce_experience: boolean
          id: string
          last_rejected_date: string | null
          linkedin_url: string | null
          portfolio_url: string | null
          user_id: string
          video_interview_response_id: string | null
          years_of_experience: string
        }
        Insert: {
          created_at?: string | null
          has_ecommerce_experience: boolean
          id?: string
          last_rejected_date?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          user_id: string
          video_interview_response_id?: string | null
          years_of_experience: string
        }
        Update: {
          created_at?: string | null
          has_ecommerce_experience?: boolean
          id?: string
          last_rejected_date?: string | null
          linkedin_url?: string | null
          portfolio_url?: string | null
          user_id?: string
          video_interview_response_id?: string | null
          years_of_experience?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_video_interview_response"
            columns: ["video_interview_response_id"]
            isOneToOne: false
            referencedRelation: "video_interview_responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      niches: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      referral_sources: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      service_category_subcategories: {
        Row: {
          created_at: string | null
          id: string
          service_category_id: string
          service_subcategory_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_category_id: string
          service_subcategory_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_category_id?: string
          service_subcategory_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_category_subcategories_service_category_id_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_category_subcategories_service_subcategory_id_fkey"
            columns: ["service_subcategory_id"]
            isOneToOne: false
            referencedRelation: "service_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_category_tools: {
        Row: {
          created_at: string | null
          id: string
          service_category_id: string
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_category_id: string
          tool_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_category_id?: string
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_category_tools_service_category_id_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_category_tools_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      service_subcategories: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          city: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          mobile_no: string | null
          referral_source_id: string | null
          user_type: Database["public"]["Enums"]["usertypes"] | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          mobile_no?: string | null
          referral_source_id?: string | null
          user_type?: Database["public"]["Enums"]["usertypes"] | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          mobile_no?: string | null
          referral_source_id?: string | null
          user_type?: Database["public"]["Enums"]["usertypes"] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_referral_source"
            columns: ["referral_source_id"]
            isOneToOne: false
            referencedRelation: "referral_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      video_interview_responses: {
        Row: {
          about_freelancer: string | null
          challenge_solved: string | null
          created_at: string | null
          id: string
          recent_experience: string | null
          what_seperates_avg: string | null
        }
        Insert: {
          about_freelancer?: string | null
          challenge_solved?: string | null
          created_at?: string | null
          id?: string
          recent_experience?: string | null
          what_seperates_avg?: string | null
        }
        Update: {
          about_freelancer?: string | null
          challenge_solved?: string | null
          created_at?: string | null
          id?: string
          recent_experience?: string | null
          what_seperates_avg?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      usertypes: "EXPERT" | "CLIENT" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
