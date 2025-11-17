"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/custom/auth-provider"
import { useWorkoutTracking } from "@/hooks/useWorkoutTracking"
import { workoutPlans } from "@/lib/workout-data"
import { 
  Play, 
  Clock, 
  Target, 
  ChevronRight,
  Home,
  Building2,
  CheckCircle2,
  Info
} from "lucide-react"

export default function WorkoutsPage() {
  const { user } = useAuth()
  const { logWorkout } = useWorkoutTracking()
  const [selectedPlan, setSelectedPlan] = useState<typeof workoutPlans[0] | null>(null)
  const [startingWorkout, setStartingWorkout] = useState(false)

  const handleStartWorkout = async (plan: typeof workoutPlans[0]) => {
    if (!user) {
      alert("Faça login para iniciar um treino")
      return
    }

    setStartingWorkout(true)
    // Aqui você pode adicionar lógica para iniciar o treino
    // Por exemplo, navegar para uma página de execução do treino
    setTimeout(() => {
      setStartingWorkout(false)
      alert(`Treino "${plan.name}" iniciado! Boa sorte! 💪`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Planos de Treino
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Escolha o plano perfeito para seus objetivos e comece a treinar agora
          </p>
        </div>

        {/* Grid de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {workoutPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-400 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <div className={`h-3 bg-gradient-to-r ${plan.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <Badge className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border">
                    {plan.location === "casa" ? (
                      <Home className="w-3 h-3 mr-1" />
                    ) : (
                      <Building2 className="w-3 h-3 mr-1" />
                    )}
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
                  <h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Exercícios Inclusos:
                  </h4>
                  <div className="space-y-2">
                    {plan.exercises.map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <ChevronRight className={`w-4 h-4 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                        <span className="text-gray-700 dark:text-gray-300">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white py-6`}
                    onClick={() => handleStartWorkout(plan)}
                    disabled={startingWorkout}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {startingWorkout ? "Iniciando..." : "Iniciar Treino"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Ver Detalhes
                  </Button>
                </div>
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
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
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
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Progressão
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aumente gradualmente a intensidade a cada semana
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Detalhes */}
        {selectedPlan && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <Card 
              className="max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <ScrollArea className="h-full max-h-[90vh]">
                <div className={`h-32 bg-gradient-to-r ${selectedPlan.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">{selectedPlan.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                    onClick={() => setSelectedPlan(null)}
                  >
                    ✕
                  </Button>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {selectedPlan.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">Duração</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {selectedPlan.duration}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">Nível</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {selectedPlan.level}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Exercícios do Plano:</h3>
                    <div className="space-y-2">
                      {selectedPlan.exercises.map((ex, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-3 bg-gradient-to-r ${selectedPlan.color} bg-opacity-10 p-3 rounded-lg`}
                        >
                          <div className={`bg-gradient-to-r ${selectedPlan.color} text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold`}>
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 font-medium">{ex}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${selectedPlan.color} text-white py-6 text-lg`}
                    onClick={() => {
                      handleStartWorkout(selectedPlan)
                      setSelectedPlan(null)
                    }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Este Treino
                  </Button>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
