"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Target, Megaphone, Users, TrendingUp, CheckCircle2 } from "lucide-react"

const goals = [
  { id: "promote", label: "Promote Products", icon: Megaphone, description: "Increase product visibility" },
  { id: "ads", label: "Run Ad Campaigns", icon: Target, description: "Automated advertising" },
  { id: "competitor", label: "Competitor Analysis", icon: Users, description: "Stay ahead of competition" },
  { id: "growth", label: "Sales Growth", icon: TrendingUp, description: "Boost revenue & conversions" },
]

interface GoalSelectionProps {
  onComplete: (goals: string[]) => void
}

export function GoalSelection({ onComplete }: GoalSelectionProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      onComplete(selectedGoals)
    }
  }

  return (
    <Card className="p-8 bg-card border-border/50">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex p-4 bg-primary/10 rounded-full mb-4"
        >
          <Target className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-2">What are your goals?</h1>
        <p className="text-muted-foreground">Select all that apply (you can change these later)</p>
      </div>

      <div className="space-y-6">
        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            const isSelected = selectedGoals.includes(goal.id)

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-6 rounded-lg border-2 transition-all text-left relative ${
                    isSelected ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${isSelected ? "bg-primary/20" : "bg-muted"} transition-colors`}>
                      <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button
            onClick={handleContinue}
            disabled={selectedGoals.length === 0}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continue ({selectedGoals.length} selected)
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}
