"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Lock, Mail } from "lucide-react"

interface StoreLoginProps {
  store: string
  onComplete: () => void
}

export function StoreLogin({ store, onComplete }: StoreLoginProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onComplete()
    }, 1500)
  }

  return (
    <Card className="p-8 bg-card border-border/50 max-w-md mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex p-4 bg-primary/10 rounded-full mb-4"
        >
          <Lock className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Login to {store}</h1>
        <p className="text-muted-foreground">Enter your credentials to connect your store</p>
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-input border-border/50"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-input border-border/50"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button
            onClick={handleLogin}
            disabled={!email || !password || isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? "Connecting..." : "Login & Connect"}
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}
