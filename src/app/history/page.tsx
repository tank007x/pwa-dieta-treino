"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/custom/auth-provider"
import { useWorkoutTracking } from "@/hooks/useWorkoutTracking"
import { useRouter } from "next/navigation"
import { 
  Activity, 
  Calendar, 
  Dumbbell,
  TrendingUp,
  CheckCircle2,
  LogIn,
  Clock,
  Flame
} from "lucide-react"

export default function HistoryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { workoutLogs, loading, getStats } = useWorkoutTracking()

  const stats = user ? getStats() : null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const groupWorkoutsByDate = () => {
    const grouped: { [key: string]: typeof workoutLogs } = {}
    
    workoutLogs.forEach(log => {
      const date = new Date(log.completed_at).toLocaleDateString('pt-BR')
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(log)
    })

    return grouped
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Activity className="w-6 h-6 text-blue-600" />
                Faça Login para Ver Seu Histórico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Entre ou crie uma conta para acessar seu histórico completo de treinos e estatísticas.
              </p>
              <Button 
                onClick={() => router.push('/login')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-6"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Entrar ou Criar Conta
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const groupedWorkouts = groupWorkoutsByDate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Histórico de Treinos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Acompanhe sua jornada e veja todo o progresso que você já conquistou
          </p>
        </div>

        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-3 rounded-full">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hoje</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {stats.todayCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-3 rounded-full">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Semana</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {stats.weekCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mês</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      {stats.monthCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      {stats.totalWorkouts}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lista de Treinos */}
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">Carregando histórico...</p>
            </CardContent>
          </Card>
        ) : workoutLogs.length === 0 ? (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-blue-600" />
                Comece Sua Jornada!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Você ainda não registrou nenhum treino. Que tal começar agora?
              </p>
              <Button 
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                Ver Exercícios
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedWorkouts).map(([date, logs]) => (
              <Card key={date} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    {date}
                  </CardTitle>
                  <CardDescription>
                    {logs.length} {logs.length === 1 ? 'exercício' : 'exercícios'} completados
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                              {log.exercise_name}
                            </h4>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Dumbbell className="w-4 h-4" />
                                <span>{log.sets_completed} séries</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="w-4 h-4" />
                                <span>{log.reps_completed} reps</span>
                              </div>
                              {log.weight_used && (
                                <div className="flex items-center gap-1">
                                  <Flame className="w-4 h-4" />
                                  <span>{log.weight_used} kg</span>
                                </div>
                              )}
                              {log.duration_minutes && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{log.duration_minutes} min</span>
                                </div>
                              )}
                            </div>
                            {log.notes && (
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                                "{log.notes}"
                              </p>
                            )}
                          </div>
                          <Badge variant="outline" className="ml-4">
                            {formatDate(log.completed_at).split(',')[1]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Resumo Geral */}
        {stats && stats.totalWorkouts > 0 && (
          <Card className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Resumo Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{stats.totalWorkouts}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Treinos Totais</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{stats.totalSets}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Séries Completadas</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{stats.totalReps}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Repetições Totais</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
