"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/custom/auth-provider"
import { 
  Dumbbell, 
  Home, 
  Target, 
  Activity, 
  User as UserIcon,
  LogIn, 
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/workouts", label: "Treinos", icon: Target },
    { href: "/history", label: "Histórico", icon: Activity },
    { href: "/profile", label: "Perfil", icon: UserIcon },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FitPro Guide
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden md:block">
                Seu guia completo de treinos
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  onClick={() => router.push(item.href)}
                  className={
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : ""
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Badge className="hidden sm:flex bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5">
                  <UserIcon className="w-4 h-4 mr-1" />
                  {user.email?.split("@")[0]}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="hidden md:flex gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="hidden md:flex bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white gap-2"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t pt-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  onClick={() => {
                    router.push(item.href)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full justify-start ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : ""
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
            {user ? (
              <Button
                variant="outline"
                onClick={() => {
                  signOut()
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login")
                  setMobileMenuOpen(false)
                }}
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-600 text-white gap-2"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
