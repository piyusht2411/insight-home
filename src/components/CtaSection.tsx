"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SearchDialog } from "@/components/ui/seach-dialog"

export function CTASection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/20 to-accent/20 border-t border-border/50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Ready to Analyze Your Website?</h2>
        <p className="text-lg text-muted-foreground">
          Get started for free. No credit card required. Start discovering insights in seconds.
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-lg glow-primary"
          onClick={() => setOpen(true)}
        >
          Get Started Now
        </Button>
        <SearchDialog open={open} onOpenChange={setOpen} />
      </div>
    </section>
  )
}
