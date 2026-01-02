"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-2xl px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-semibold text-lg">MoodMatrix</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#" className="text-white/90 hover:text-white transition text-sm">
                Início
              </a>
              <a href="#" className="text-white/90 hover:text-white transition text-sm">
                Dashboard
              </a>
              <a href="#" className="text-white/90 hover:text-white transition text-sm">
                Sobre
              </a>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Analisar
              </Button>
            </div>

            {/* User Profile (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-white/90 text-sm">Olá, Diego!</span>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-3">
              <a href="#" className="block text-white/90 hover:text-white transition text-sm py-2">
                Início
              </a>
              <a href="#" className="block text-white/90 hover:text-white transition text-sm py-2">
                Dashboard
              </a>
              <a href="#" className="block text-white/90 hover:text-white transition text-sm py-2">
                Sobre
              </a>
              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Analisar
              </Button>
              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <span className="text-white/90 text-sm">Olá, Diego!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
