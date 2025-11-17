"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/custom/auth-provider"
import { useWorkoutTracking } from "@/hooks/useWorkoutTracking"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { 
  User as UserIcon, 
  Mail, 
  Calendar,
  Award,
  TrendingUp,
  Target,
  LogIn,
  Save,
  CheckCircle2
} from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { getStats } = useWorkoutTracking()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const stats = user ? getStats() : null

  useEffect(() => {
    if (user) {
      setEmail(user.email || "")
      // Carregar nome do perfil
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar perfil:', error)
        return
      }

      if (data) {
        setFullName(data.full_name || "")
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil' })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <UserIcon className="w-6 h-6 text-blue-600" />
                Faça Login para Ver Seu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Entre ou crie uma conta para acessar seu perfil e personalizar sua experiência.
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

  const memberSince = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : 'Recente'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Meu Perfil
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Gerencie suas informações e acompanhe seu progresso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Informações do Usuário */}
          <div className="md:col-span-2 space-y-6">
            {/* Card de Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500">O email não pode ser alterado</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </form>

                {message && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {message.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-lg">⚠️</span>
                      )}
                      <p className="text-sm font-medium">{message.text}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Card de Estatísticas */}
            {stats && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Suas Estatísticas
                  </CardTitle>
                  <CardDescription>Resumo do seu desempenho</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-blue-600">{stats.totalWorkouts}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Treinos Totais</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-purple-600">{stats.totalSets}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Séries</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-green-600">{stats.totalReps}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Repetições</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-orange-600">{stats.weekCount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Esta Semana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna Direita - Informações Adicionais */}
          <div className="space-y-6">
            {/* Card de Conta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium truncate">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Membro desde</p>
                    <p className="text-sm font-medium">{memberSince}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className="bg-green-500 text-white">Ativo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de Conquistas */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats && stats.totalWorkouts >= 1 && (
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-semibold text-sm">Primeiro Treino</p>
                      <p className="text-xs text-gray-500">Completou seu primeiro treino!</p>
                    </div>
                  </div>
                )}
                {stats && stats.totalWorkouts >= 10 && (
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <p className="font-semibold text-sm">Dedicação</p>
                      <p className="text-xs text-gray-500">10 treinos completados!</p>
                    </div>
                  </div>
                )}
                {stats && stats.weekCount >= 3 && (
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <p className="font-semibold text-sm">Consistência</p>
                      <p className="text-xs text-gray-500">3+ treinos esta semana!</p>
                    </div>
                  </div>
                )}
                {(!stats || stats.totalWorkouts === 0) && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                    Complete treinos para desbloquear conquistas!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Botão de Sair */}
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={signOut}
            >
              Sair da Conta
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
