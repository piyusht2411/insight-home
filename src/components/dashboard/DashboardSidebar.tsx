"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Settings,
  Users,
  BarChart3,
  Target,
  ChevronLeft,
  Store,
} from "lucide-react"

interface DashboardSidebarProps {
  onToggle: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Products", active: false },
  { icon: TrendingUp, label: "Analytics", active: false },
  { icon: Target, label: "Campaigns", active: false },
  { icon: Users, label: "Competitors", active: false },
  { icon: BarChart3, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function DashboardSidebar({ onToggle }: DashboardSidebarProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-screen bg-card border-r border-border/50 p-4 flex flex-col w-[280px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">AI Store</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onToggle} className="hidden md:flex">
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Need help?</p>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Contact Support
        </Button>
      </div>
    </motion.div>
  )
}
