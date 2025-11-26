"use client"

import { useState } from "react"
import { SearchDialog } from "@/components/ui/seach-dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Analyze Your Website Instantly</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          Discover Product
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Insights</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Simply enter your website URL and unlock comprehensive analysis of your products. Get actionable insights
          instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-lg glow-primary"
            onClick={() => setOpen(true)}
          >
            Start for Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 font-semibold px-8 h-14 rounded-lg bg-transparent"
          >
            Watch Demo
          </Button>
        </div>

        <SearchDialog open={open} onOpenChange={setOpen} />

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Websites Analyzed", value: "10K+" },
            { label: "Products Tracked", value: "500K+" },
            { label: "Insights Generated", value: "1M+" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
