import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_KR } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationBar from "@/components/navigation-bar"

const inter = Inter({ subsets: ["latin"] })
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "밑그림 - 나에게 맞는 삶의 방향을 그려가는 공간",
  description: "청년의 언어와 고민에서 출발하여, 당신만의 삶을 큐레이션해드립니다",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} ${notoSansKr.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen relative">
            <NavigationBar />
            <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 relative z-10">
              <div className="container mx-auto max-w-6xl">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
