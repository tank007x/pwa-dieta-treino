// Tipos compartilhados da aplicação

export interface Exercise {
  id: string
  name: string
  category: string
  location: "casa" | "academia" | "ambos"
  difficulty: "iniciante" | "intermediário" | "avançado"
  muscleGroup: string
  imageUrl: string
  tips: string[]
  sets: string
  reps: string
}

export interface WorkoutPlan {
  id: string
  name: string
  description: string
  location: "casa" | "academia"
  duration: string
  level: string
  exercises: string[]
  color: string
}

export interface WorkoutStats {
  todayCount: number
  weekCount: number
  monthCount: number
  totalWorkouts: number
  totalSets: number
  totalReps: number
}
