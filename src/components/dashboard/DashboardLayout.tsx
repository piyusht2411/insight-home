"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { ProductDetailModal } from "@/components/dashboard/ProductDetailModal"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card border border-border/50"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar - Desktop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block"
          >
            <DashboardSidebar onToggle={() => setSidebarOpen(!sidebarOpen)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full z-50 md:hidden"
            >
              <DashboardSidebar onToggle={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="hidden md:flex fixed top-4 left-4 z-40 bg-card border border-border/50"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <DashboardContent onProductClick={setSelectedProduct} />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} open={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
