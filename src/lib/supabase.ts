import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface WorkoutLog {
  id: string
  user_id: string
  exercise_id: string
  exercise_name: string
  sets_completed: number
  reps_completed: number
  weight_used?: number
  duration_minutes?: number
  notes?: string
  completed_at: string
}

export interface UserGoal {
  id: string
  user_id: string
  goal_type: 'weight_loss' | 'muscle_gain' | 'endurance' | 'strength'
  target_value: number
  current_value: number
  deadline: string
  created_at: string
  updated_at: string
}

export interface WorkoutPlanProgress {
  id: string
  user_id: string
  plan_id: string
  plan_name: string
  started_at: string
  completed_at?: string
  progress_percentage: number
}
