"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

const steps = [
  { id: 1, label: "Creating your profile" },
  { id: 2, label: "Analyzing your store" },
  { id: 3, label: "Setting up campaigns" },
  { id: 4, label: "Preparing dashboard" },
]

export function ProcessingAnimation() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-12 bg-card border-border/50 max-w-md mx-auto">
      <div className="text-center space-y-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="inline-flex p-6 bg-primary/10 rounded-full"
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Setting up your account</h2>
          <p className="text-muted-foreground">This will only take a moment...</p>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                index <= currentStep ? "bg-primary/10" : "bg-muted/30"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : index === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Loader2 className="w-5 h-5 text-primary" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-border" />
              )}
              <span
                className={`text-sm font-medium ${index <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}
