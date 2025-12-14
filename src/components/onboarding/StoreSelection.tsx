"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ShoppingBag, Store } from "lucide-react"

const stores = [
  { id: "shopify", name: "Shopify", icon: "S", color: "from-green-500 to-emerald-500" },
  { id: "woocommerce", name: "WooCommerce", icon: "W", color: "from-purple-500 to-violet-500" },
  { id: "bigcommerce", name: "BigCommerce", icon: "B", color: "from-blue-500 to-cyan-500" },
  { id: "magento", name: "Magento", icon: "M", color: "from-orange-500 to-red-500" },
]

interface StoreSelectionProps {
  onSelect: (store: string) => void
}

export function StoreSelection({ onSelect }: StoreSelectionProps) {
  const [selectedStore, setSelectedStore] = useState<string>("");

  const handleContinue = () => {
    if (selectedStore) {
      onSelect(selectedStore)
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
          <ShoppingBag className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Connect Your Store</h1>
        <p className="text-muted-foreground">Select your e-commerce platform to get started</p>
      </div>

      <div className="space-y-6">
        {/* Store Platform Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedStore(store.id)}
                className={`w-full p-6 rounded-lg border-2 transition-all ${
                  selectedStore === store.id
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/50 bg-card"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${store.color} flex items-center justify-center text-white font-bold text-xl`}
                >
                  {store.icon}
                </div>
                <p className="text-sm font-medium text-foreground">{store.name}</p>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button
            onClick={handleContinue}
            disabled={!selectedStore}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}
