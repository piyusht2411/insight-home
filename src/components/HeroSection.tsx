"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SearchDialog } from "@/components/ui/seach-dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { WorkflowAnimation } from "@/components/WorkflowAnimation"
import { LogoCarousel } from "@/components/LogoCarousel"

export function HeroSection() {
  const [open, setOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
        //@ts-ignore
        variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full hover:border-primary/60 transition-colors">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered E-commerce Growth</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
        //@ts-ignore
         variants={itemVariants} className="text-center mb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
            Boost Your Sales with
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
              AI—No Experience Needed
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
        //@ts-ignore
          variants={itemVariants}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Connect your Shopify or WooCommerce store. Let our AI audit your products, optimize listings, and launch
          growth campaigns automatically.
        </motion.p>

        {/* Workflow Animation */}
        <motion.div 
        //@ts-ignore
        variants={itemVariants} className="mb-12">
          <WorkflowAnimation />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
        //@ts-ignore
         variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-lg group"
            onClick={() => setOpen(true)}
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 font-semibold px-8 h-14 rounded-lg bg-transparent"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Logo Carousel */}
        
        <motion.div
        //@ts-ignore
         variants={itemVariants}>
          <LogoCarousel />
        </motion.div>

        {/* Stats */}
        <motion.div
        //@ts-ignore
          variants={itemVariants}
          className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/30"
        >
          {[
            { label: "Stores Connected", value: "50K+" },
            { label: "Revenue Generated", value: "$100M+" },
            { label: "Active Campaigns", value: "500K+" },
          ].map((stat) => (
            <motion.div key={stat.label} className="text-center space-y-2" whileHover={{ scale: 1.05 }}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </section>
  )
}
