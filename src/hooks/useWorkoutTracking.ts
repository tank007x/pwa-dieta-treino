"use client"

import { useState, useEffect } from 'react'
import { supabase, WorkoutLog } from '@/lib/supabase'
import { useAuth } from '@/components/custom/auth-provider'

export function useWorkoutTracking() {
  const { user } = useAuth()
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [loading, setLoading] = useState(false)

  // Carregar histórico de treinos
  useEffect(() => {
    if (user) {
      loadWorkoutLogs()
    }
  }, [user])

  const loadWorkoutLogs = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setWorkoutLogs(data || [])
    } catch (error) {
      console.error('Erro ao carregar treinos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Registrar treino concluído
  const logWorkout = async (exerciseData: {
    exercise_id: string
    exercise_name: string
    sets_completed: number
    reps_completed: number
    weight_used?: number
    duration_minutes?: number
    notes?: string
  }) => {
    if (!user) return { success: false, error: 'Usuário não autenticado' }

    try {
      const { data, error } = await supabase
        .from('workout_logs')
        .insert([
          {
            user_id: user.id,
            ...exerciseData,
            completed_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      // Atualizar lista local
      await loadWorkoutLogs()

      return { success: true, data }
    } catch (error: any) {
      console.error('Erro ao registrar treino:', error)
      return { success: false, error: error.message }
    }
  }

  // Obter estatísticas
  const getStats = () => {
    const today = new Date()
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const todayWorkouts = workoutLogs.filter(
      log => new Date(log.completed_at).toDateString() === today.toDateString()
    )

    const weekWorkouts = workoutLogs.filter(
      log => new Date(log.completed_at) >= thisWeek
    )

    const monthWorkouts = workoutLogs.filter(
      log => new Date(log.completed_at) >= thisMonth
    )

    const totalSets = workoutLogs.reduce((sum, log) => sum + log.sets_completed, 0)
    const totalReps = workoutLogs.reduce((sum, log) => sum + log.reps_completed, 0)

    return {
      todayCount: todayWorkouts.length,
      weekCount: weekWorkouts.length,
      monthCount: monthWorkouts.length,
      totalWorkouts: workoutLogs.length,
      totalSets,
      totalReps,
    }
  }

  return {
    workoutLogs,
    loading,
    logWorkout,
    getStats,
    refreshLogs: loadWorkoutLogs,
  }
}
