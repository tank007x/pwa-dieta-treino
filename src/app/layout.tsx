import type { Metadata, Viewport } from "next"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "./globals.css"
import { AuthProvider } from "@/components/custom/auth-provider"
import { Navbar } from "@/components/custom/navbar"

export const metadata: Metadata = {
  title: "FitPro Guide - Seu Guia Completo de Treinos",
  description: "Transforme seu corpo com treinos inteligentes, rastreamento de progresso e planos personalizados",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FitPro Guide",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="font-inter">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('Service Worker registrado'))
                    .catch(err => console.log('Erro ao registrar SW:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
