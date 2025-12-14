"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: {
    id: number
    title: string
    vendor: string
    product_type: string
    handle: string
    images: any[]
    variants: any[]
    body_html: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.src || product.variants?.[0]?.featured_image?.src
  const price = product.variants?.[0]?.price || "N/A"
  const compareAtPrice = product.variants?.[0]?.compare_at_price

  return (
    <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/20">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted/30 aspect-square">
        {imageUrl ? (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Vendor Badge */}
        {product.vendor && (
          <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs w-fit">
            {product.vendor}
          </Badge>
        )}

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Type */}
        {product.product_type && <p className="text-sm text-muted-foreground capitalize">{product.product_type}</p>}

        {/* Price */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-lg font-bold text-primary">₹{price}</span>
          {compareAtPrice && <span className="text-sm text-muted-foreground line-through">₹{compareAtPrice}</span>}
        </div>

        {/* Variants Count */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border/30">
          <TrendingUp className="w-3 h-3" />
          <span>{product.variants?.length || 0} variants</span>
        </div>
      </div>
    </Card>
  )
}
