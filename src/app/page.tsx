"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/custom/auth-provider"
import { useWorkoutTracking } from "@/hooks/useWorkoutTracking"
import { exercises, workoutPlans } from "@/lib/workout-data"
import { Exercise } from "@/lib/types"
import { 
  Home,
  Building2,
  Play,
  CheckCircle2,
  Target,
  Zap,
  TrendingUp,
  Clock,
  Flame,
  Star,
  ChevronRight,
  Info,
  Award,
  Activity,
  BarChart3,
  LogIn
} from "lucide-react"

export default function FitnessPro() {
  const router = useRouter()
  const { user } = useAuth()
  const { workoutLogs, logWorkout, getStats } = useWorkoutTracking()
  
  const [selectedLocation, setSelectedLocation] = useState<"todos" | "casa" | "academia">("todos")
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [selectedActivityImage, setSelectedActivityImage] = useState<number | null>(null)
  const [completingExercise, setCompletingExercise] = useState(false)

  const stats = user ? getStats() : null

  const filteredExercises = exercises.filter(ex => {
    const locationMatch = selectedLocation === "todos" || ex.location === selectedLocation || ex.location === "ambos"
    const categoryMatch = selectedCategory === "todos" || ex.category === selectedCategory
    return locationMatch && categoryMatch
  })

  const categories = ["todos", ...Array.from(new Set(exercises.map(ex => ex.category)))]

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "iniciante": return "bg-green-100 text-green-700 border-green-200"
      case "intermediário": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "avançado": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const activityImages = [
    "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/12cea16e-66d9-47ae-870f-7ce7cdebd732.png",
    "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/c0d6aa42-1a1d-43e3-a3e4-7df61d25f0ab.png",
    "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8c55f1fb-9d27-4d48-a8af-96332183b815.png"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Transforme Seu Corpo
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aprenda a executar exercícios corretamente com dicas profissionais, animações e planos personalizados
          </p>
        </div>

        <Tabs defaultValue="exercicios" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-white dark:bg-gray-800 shadow-md">
            <TabsTrigger value="exercicios" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Target className="w-5 h-5 mr-2" />
              Exercícios
            </TabsTrigger>
            <TabsTrigger value="planos" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Award className="w-5 h-5 mr-2" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="progresso" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              <Activity className="w-5 h-5 mr-2" />
              Progresso
            </TabsTrigger>
          </TabsList>

          {/* Tab Exercícios */}
          <TabsContent value="exercicios" className="space-y-6">
            {/* Filtros */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Filtrar Exercícios
                </CardTitle>
                <CardDescription>Encontre o exercício perfeito para você</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filtro Local */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Local de Treino</label>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedLocation === "todos" ? "default" : "outline"}
                      onClick={() => setSelectedLocation("todos")}
                      className={selectedLocation === "todos" ? "bg-gradient-to-r from-blue-500 to-indigo-600" : ""}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Todos
                    </Button>
                    <Button
                      variant={selectedLocation === "casa" ? "default" : "outline"}
                      onClick={() => setSelectedLocation("casa")}
                      className={selectedLocation === "casa" ? "bg-gradient-to-r from-emerald-500 to-teal-600" : ""}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Casa
                    </Button>
                    <Button
                      variant={selectedLocation === "academia" ? "default" : "outline"}
                      onClick={() => setSelectedLocation("academia")}
                      className={selectedLocation === "academia" ? "bg-gradient-to-r from-orange-500 to-red-600" : ""}
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Academia
                    </Button>
                  </div>
                </div>

                {/* Filtro Categoria */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Grupo Muscular</label>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        onClick={() => setSelectedCategory(cat)}
                        size="sm"
                        className={selectedCategory === cat ? "bg-gradient-to-r from-purple-500 to-pink-600" : ""}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grid de Exercícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-400 bg-white dark:bg-gray-800 overflow-hidden"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-800 border-0">
                        {exercise.location === "casa" ? <Home className="w-3 h-3 mr-1" /> : 
                         exercise.location === "academia" ? <Building2 className="w-3 h-3 mr-1" /> :
                         <Star className="w-3 h-3 mr-1" />}
                        {exercise.location === "ambos" ? "Casa/Academia" : exercise.location.charAt(0).toUpperCase() + exercise.location.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        <Play className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      {exercise.muscleGroup}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {exercise.sets} séries
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {exercise.reps} reps
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Modal de Detalhes do Exercício */}
            {selectedExercise && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedExercise(null)}>
                <Card className="max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <ScrollArea className="h-full max-h-[90vh]">
                    <div className="relative h-64 md:h-80">
                      <img 
                        src={selectedExercise.imageUrl} 
                        alt={selectedExercise.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedExercise.name}</h2>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                            {selectedExercise.difficulty}
                          </Badge>
                          <Badge className="bg-white/90 text-gray-800">
                            {selectedExercise.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                        onClick={() => setSelectedExercise(null)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          Músculos Trabalhados
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">{selectedExercise.muscleGroup}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Flame className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold">Séries</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{selectedExercise.sets}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="font-semibold">Repetições</span>
                          </div>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-300">{selectedExercise.reps}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <Info className="w-5 h-5 text-purple-600" />
                          Dicas de Execução
                        </h3>
                        <div className="space-y-3">
                          {selectedExercise.tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                              <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                {idx + 1}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {user && (
                          <Button 
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg"
                            onClick={async () => {
                              setCompletingExercise(true)
                              const result = await logWorkout({
                                exercise_id: selectedExercise.id,
                                exercise_name: selectedExercise.name,
                                sets_completed: parseInt(selectedExercise.sets.split('-')[0]),
                                reps_completed: parseInt(selectedExercise.reps.split('-')[0]),
                              })
                              setCompletingExercise(false)
                              if (result.success) {
                                setSelectedExercise(null)
                              }
                            }}
                            disabled={completingExercise}
                          >
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            {completingExercise ? 'Registrando...' : 'Marcar como Concluído'}
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          className="w-full py-6 text-lg"
                          onClick={() => setSelectedExercise(null)}
                        >
                          Fechar
                        </Button>
                      </div>
                    </CardContent>
                  </ScrollArea>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Tab Planos de Treino */}
          <TabsContent value="planos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workoutPlans.map((plan) => (
                <Card key={plan.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-400 bg-white dark:bg-gray-800 overflow-hidden">
                  <div className={`h-3 bg-gradient-to-r ${plan.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <Badge className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border">
                        {plan.location === "casa" ? <Home className="w-3 h-3 mr-1" /> : <Building2 className="w-3 h-3 mr-1" />}
                        {plan.location.charAt(0).toUpperCase() + plan.location.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span>{plan.level}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">Exercícios Inclusos:</h4>
                      <div className="space-y-2">
                        {plan.exercises.map((ex, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <ChevronRight className={`w-4 h-4 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                            <span className="text-gray-700 dark:text-gray-300">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white py-6`}
                      onClick={() => router.push('/workouts')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dicas Gerais */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Info className="w-6 h-6 text-blue-600" />
                  Dicas Importantes para Seu Treino
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600" />
                      Aquecimento
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sempre aqueça por 5-10 minutos antes de treinar para prevenir lesões
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Técnica Primeiro
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Priorize a execução correta antes de aumentar a carga
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Descanso
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Respeite o tempo de descanso entre séries (60-90 segundos)
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Progressão
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Aumente gradualmente a intensidade a cada semana
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Progresso */}
          <TabsContent value="progresso" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  Dashboard de Atividades
                </CardTitle>
                <CardDescription>Acompanhe seu progresso diário e conquiste seus objetivos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activityImages.map((imgUrl, idx) => (
                    <Card 
                      key={idx}
                      className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-green-400 bg-white dark:bg-gray-800 overflow-hidden"
                      onClick={() => setSelectedActivityImage(idx)}
                    >
                      <div className="relative aspect-[9/16] overflow-hidden">
                        <img 
                          src={imgUrl} 
                          alt={`Resumo de Atividades ${idx + 1}`}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                            <Play className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-base">Resumo de Atividades</CardTitle>
                        <CardDescription className="text-sm">
                          Círculo de atividade, passos, distância e prêmios
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                {/* Cards de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-500 p-3 rounded-full">
                          <Flame className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Treinos Hoje</p>
                          <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                            {user && stats ? stats.todayCount : '0'}
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
                          <p className="text-sm text-gray-600 dark:text-gray-400">Esta Semana</p>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {user && stats ? stats.weekCount : '0'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-3 rounded-full">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Este Mês</p>
                          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            {user && stats ? stats.monthCount : '0'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-500 p-3 rounded-full">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                            {user && stats ? stats.totalWorkouts : '0'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Dica de Progresso */}
                {user ? (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Continue Assim!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        Você está no caminho certo! Mantenha a consistência nos treinos e acompanhe seu progresso diariamente para alcançar seus objetivos mais rápido.
                      </p>
                      {stats && stats.totalWorkouts > 0 && (
                        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suas estatísticas:</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-semibold text-blue-600">Total de séries:</span> {stats.totalSets}
                            </div>
                            <div>
                              <span className="font-semibold text-purple-600">Total de reps:</span> {stats.totalReps}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Faça Login para Rastrear Seu Progresso
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        Entre ou crie uma conta para desbloquear recursos incríveis:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Rastreie todos os seus treinos
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Veja estatísticas detalhadas
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Defina e acompanhe metas
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Salve seus planos favoritos
                        </li>
                      </ul>
                      <Button 
                        onClick={() => router.push('/login')}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-6"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Entrar ou Criar Conta
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Modal de Imagem Ampliada */}
            {selectedActivityImage !== null && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedActivityImage(null)}>
                <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                  <img 
                    src={activityImages[selectedActivityImage]} 
                    alt={`Resumo de Atividades ${selectedActivityImage + 1}`}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                    onClick={() => setSelectedActivityImage(null)}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
