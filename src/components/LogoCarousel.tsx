"use client"

import { motion } from "framer-motion"

const logos = [
  { name: "Shopify", symbol: "S" },
  { name: "WooCommerce", symbol: "W" },
  { name: "Amazon", symbol: "A" },
  { name: "eBay", symbol: "E" },
  { name: "Etsy", symbol: "ET" },
  { name: "BigCommerce", symbol: "B" },
]

export function LogoCarousel() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
        Trusted by leading e-commerce platforms
      </p>

      <motion.div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {logos.map((logo) => (
          <motion.div
            key={logo.name}
            //@ts-ignore
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            className="flex items-center justify-center"
          >
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-card border border-border/50 flex items-center justify-center font-bold text-lg text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              whileHover={{ boxShadow: "0 0 20px rgba(var(--primary), 0.2)" }}
            >
              {logo.symbol}
            </motion.div>
            <span className="sr-only">{logo.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator animation */}
      <motion.div
        className="flex justify-center pt-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg className="w-5 h-5 text-primary/40" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 15a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 15z"
            clipRule="evenodd"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
