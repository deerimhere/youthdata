"use client"

import Link from "next/link"
import { Home, Search, BookOpen, Link2Icon, UserCircle, Menu, X, Brain } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { href: "/", label: "홈", icon: Home, gradient: "from-pink-500 to-rose-500" },
  { href: "/survey", label: "설문", icon: Brain, gradient: "from-indigo-500 to-purple-500" },
  { href: "/explore", label: "탐색", icon: Search, gradient: "from-blue-500 to-cyan-500" },
  { href: "/learn", label: "학습", icon: BookOpen, gradient: "from-green-500 to-emerald-500" },
  { href: "/connect", label: "연결", icon: Link2Icon, gradient: "from-purple-500 to-violet-500" },
  { href: "/my-room", label: "마이룸", icon: UserCircle, gradient: "from-orange-500 to-amber-500" },
]

export default function NavigationBar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card rounded-full px-6 py-3">
          <div className="flex items-center space-x-1">
            <Link href="/" className="flex items-center mr-6">
              <span className="text-lg font-bold gradient-text text-violet-500">
                <span className="wave-text inline-block">밑</span>
                <span className="wave-text inline-block">그</span>
                <span className="wave-text inline-block">림</span>
              </span>
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "relative group px-4 py-2 rounded-full transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r " + item.gradient + " text-white shadow-lg"
                        : "hover:bg-white/10 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="glass-card m-4 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold gradient-text">
                <span className="wave-text inline-block">밑</span>
                <span className="wave-text inline-block">그</span>
                <span className="wave-text inline-block">림</span>
              </span>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-r " + item.gradient + " text-white shadow-lg"
                          : "hover:bg-white/10 text-muted-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="glass-card rounded-2xl px-2 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex flex-col items-center p-3 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r " + item.gradient + " text-white shadow-lg transform scale-110"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

NavigationBar.defaultProps = {}
