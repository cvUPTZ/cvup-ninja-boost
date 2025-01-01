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
      aggregated_metrics: {
        Row: {
          average_session_duration: number | null
          bounce_rate: number | null
          id: string
          timestamp: string | null
          total_clicks: number | null
          total_visits: number | null
          unique_visitors: number | null
        }
        Insert: {
          average_session_duration?: number | null
          bounce_rate?: number | null
          id?: string
          timestamp?: string | null
          total_clicks?: number | null
          total_visits?: number | null
          unique_visitors?: number | null
        }
        Update: {
          average_session_duration?: number | null
          bounce_rate?: number | null
          id?: string
          timestamp?: string | null
          total_clicks?: number | null
          total_visits?: number | null
          unique_visitors?: number | null
        }
        Relationships: []
      }
      apprenants: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      formateurs: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          speciality: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          speciality?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          speciality?: string | null
        }
        Relationships: []
      }
      formations: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration: number
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      inscriptions_formation: {
        Row: {
          apprenant_id: string | null
          created_at: string | null
          id: string
          seance_id: string | null
          status: string | null
        }
        Insert: {
          apprenant_id?: string | null
          created_at?: string | null
          id?: string
          seance_id?: string | null
          status?: string | null
        }
        Update: {
          apprenant_id?: string | null
          created_at?: string | null
          id?: string
          seance_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inscriptions_formation_apprenant_id_fkey"
            columns: ["apprenant_id"]
            isOneToOne: false
            referencedRelation: "apprenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inscriptions_formation_seance_id_fkey"
            columns: ["seance_id"]
            isOneToOne: false
            referencedRelation: "seances_formation"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          id: string
          path: string
          session_id: string
          timestamp: string | null
          visitor_ip: string
        }
        Insert: {
          id?: string
          path: string
          session_id: string
          timestamp?: string | null
          visitor_ip: string
        }
        Update: {
          id?: string
          path?: string
          session_id?: string
          timestamp?: string | null
          visitor_ip?: string
        }
        Relationships: []
      }
      seances_formation: {
        Row: {
          created_at: string | null
          date_debut: string
          date_fin: string
          formateur_id: string | null
          formation_id: string | null
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          date_debut: string
          date_fin: string
          formateur_id?: string | null
          formation_id?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          date_debut?: string
          date_fin?: string
          formateur_id?: string | null
          formation_id?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seances_formation_formateur_id_fkey"
            columns: ["formateur_id"]
            isOneToOne: false
            referencedRelation: "formateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seances_formation_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          additional_data: Json | null
          element_id: string | null
          id: string
          session_id: string
          timestamp: string | null
          type: string
          visitor_ip: string
        }
        Insert: {
          additional_data?: Json | null
          element_id?: string | null
          id?: string
          session_id: string
          timestamp?: string | null
          type: string
          visitor_ip: string
        }
        Update: {
          additional_data?: Json | null
          element_id?: string | null
          id?: string
          session_id?: string
          timestamp?: string | null
          type?: string
          visitor_ip?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string | null
          role?: string | null
          status?: string | null
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
      [_ in never]: never
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
