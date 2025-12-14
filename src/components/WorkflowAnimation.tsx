"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Zap, Rocket, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: ShoppingCart,
    label: "Connect Store",
    description: "Link your Shopify or WooCommerce",
  },
  {
    icon: Zap,
    label: "Audit Products",
    description: "AI analyzes your catalog",
  },
  {
    icon: Rocket,
    label: "Launch Campaigns",
    description: "Auto-optimized listings",
  },
  {
    icon: TrendingUp,
    label: "Watch Sales Grow",
    description: "Real-time analytics & results",
  },
]

export function WorkflowAnimation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div key={step.label}
            //@ts-ignore
             variants={itemVariants} className="relative">
              {/* Card */}
              <div className="bg-card border border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-center">
                <motion.div
                  className="p-4 bg-primary/10 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{step.label}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>

              {/* Arrow connector for desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-3 w-6 text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M 0 10 Q 5 5, 10 10 T 20 10" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-lg -z-10 blur-xl"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
