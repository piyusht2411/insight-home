"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const campaignTypes = [
  {
    platform: "Facebook",
    icon: Facebook,
    status: "Active",
    reach: "12.5K",
    engagement: "8.2%",
    color: "bg-blue-500",
  },
  {
    platform: "Instagram",
    icon: Instagram,
    status: "Active",
    reach: "18.3K",
    engagement: "12.4%",
    color: "bg-pink-500",
  },
  {
    platform: "YouTube",
    icon: Youtube,
    status: "Pending",
    reach: "5.1K",
    engagement: "6.8%",
    color: "bg-red-500",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    status: "Draft",
    reach: "3.2K",
    engagement: "4.5%",
    color: "bg-blue-400",
  },
]

interface ProductDetailModalProps {
  product: any
  open: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  if (!product) return null

  const imageUrl = product.images?.[0]?.src || "/placeholder.svg"
  const price = product.variants?.[0]?.price || "N/A"

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="max-w-fit! max-h-[90vh] overflow-auto bg-card border-border/50 p-0 w-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with Close Button */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border/50 p-4 flex justify-between items-center z-10">
                <h2 className="text-xl font-bold text-foreground">Product Details</h2>
                <Button variant="ghost" size="icon-sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Display */}
              <div className="p-6 space-y-6">
                {/* Product Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative w-full md:w-64 h-64 bg-muted/30 rounded-lg overflow-hidden"
                  >
                    <Image src={imageUrl || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 space-y-4"
                  >
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {product.vendor}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{product.title}</h3>
                      <p className="text-3xl font-bold text-primary">₹{price}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Type:</span> {product.product_type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Variants:</span> {product.variants?.length || 0}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Campaign Section */}
                <div>
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-bold text-foreground mb-4"
                  >
                    Ad Campaigns
                  </motion.h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaignTypes.map((campaign, index) => {
                      const Icon = campaign.icon
                      return (
                        <motion.div
                          key={campaign.platform}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Card className="p-4 bg-card border-border/50 hover:border-primary/50 transition-all">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 ${campaign.color} rounded-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold text-foreground">{campaign.platform}</h5>
                                  <Badge
                                    variant={campaign.status === "Active" ? "default" : "outline"}
                                    className={
                                      campaign.status === "Active"
                                        ? "bg-green-500/10 text-green-500 border-green-500/30"
                                        : ""
                                    }
                                  >
                                    {campaign.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Reach</p>
                                    <p className="font-semibold text-foreground">{campaign.reach}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Engagement</p>
                                    <p className="font-semibold text-foreground">{campaign.engagement}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
