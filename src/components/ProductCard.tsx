// "use client"

// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { TrendingUp, ChevronDown } from "lucide-react"
// import Image from "next/image"
// import { useState } from "react"

// interface ProductCardProps {
//   product: {
//     id: number
//     title: string
//     vendor: string
//     product_type: string
//     handle: string
//     images: any[]
//     variants: any[]
//     body_html: string
//     options?: any[]
//   }
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const [showVariants, setShowVariants] = useState(false)

//   // Get first image or use placeholder
//   const imageUrl = product.images?.[0]?.src || product.variants?.[0]?.featured_image?.src

//   // Get price from first variant
//   const price = product.variants?.[0]?.price || "N/A"
//   const compareAtPrice = product.variants?.[0]?.compare_at_price

//   const getVariantOptions = () => {
//     if (!product.variants || product.variants.length === 0) return {}

//     const options: { [key: string]: Set<string> } = {}

//     product.variants.forEach((variant) => {
//       if (variant.option1) {
//         if (!options.option1) options.option1 = new Set()
//         options.option1.add(variant.option1)
//       }
//       if (variant.option2) {
//         if (!options.option2) options.option2 = new Set()
//         options.option2.add(variant.option2)
//       }
//       if (variant.option3) {
//         if (!options.option3) options.option3 = new Set()
//         options.option3.add(variant.option3)
//       }
//     })

//     return {
//       option1: Array.from(options.option1 || []),
//       option2: Array.from(options.option2 || []),
//       option3: Array.from(options.option3 || []),
//     }
//   }

//   const variantOptions = getVariantOptions()
//   const hasVariants = Object.values(variantOptions).some((v) => v.length > 0)

//   return (
//     <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/20 flex flex-col">
//       {/* Image Container */}
//       <div className="relative overflow-hidden bg-muted/30 aspect-square">
//         {imageUrl ? (
//           <Image
//             src={imageUrl || "/placeholder.svg"}
//             alt={product.title}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <span className="text-muted-foreground text-sm">No image</span>
//           </div>
//         )}

//         {/* Discount Badge */}
//         {compareAtPrice && price && (
//           <div className="absolute top-3 right-3">
//             <Badge className="bg-primary text-primary-foreground">
//               {Math.round(
//                 ((Number.parseFloat(compareAtPrice) - Number.parseFloat(price)) / Number.parseFloat(compareAtPrice)) *
//                   100,
//               )}
//               % OFF
//             </Badge>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-3 flex-1 flex flex-col">
//         {/* Vendor Badge */}
//         {product.vendor && (
//           <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs w-fit">
//             {product.vendor}
//           </Badge>
//         )}

//         {/* Title */}
//         <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
//           {product.title}
//         </h3>

//         {/* Type */}
//         {product.product_type && <p className="text-sm text-muted-foreground capitalize">{product.product_type}</p>}

//         {/* Price */}
//         <div className="flex items-center gap-2 pt-2">
//           <span className="text-lg font-bold text-primary">₹{price}</span>
//           {compareAtPrice && <span className="text-sm text-muted-foreground line-through">₹{compareAtPrice}</span>}
//         </div>

//         {/* Variants Summary */}
//         <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t border-border/30">
//           <TrendingUp className="w-3 h-3" />
//           <span>{product.variants?.length || 0} variants available</span>
//         </div>

//         {hasVariants && (
//           <div className="mt-auto pt-3 space-y-2 border-t border-border/30">
//             <button
//               onClick={() => setShowVariants(!showVariants)}
//               className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-muted/50 transition-colors text-xs font-medium text-foreground"
//             >
//               <span>View Options</span>
//               <ChevronDown className={`w-3 h-3 transition-transform ${showVariants ? "rotate-180" : ""}`} />
//             </button>

//             {showVariants && (
//               <div className="space-y-2 pt-2">
//                 {variantOptions.option1 && variantOptions.option1.length > 0 && (
//                   <div className="space-y-1">
//                     <p className="text-xs font-semibold text-muted-foreground uppercase">
//                       {product.options?.[0]?.name || "Option 1"}
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {variantOptions.option1.slice(0, 3).map((option, idx) => (
//                         <Badge key={idx} variant="secondary" className="text-xs">
//                           {option}
//                         </Badge>
//                       ))}
//                       {variantOptions.option1.length > 3 && (
//                         <Badge variant="secondary" className="text-xs">
//                           +{variantOptions.option1.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {variantOptions.option2 && variantOptions.option2.length > 0 && (
//                   <div className="space-y-1">
//                     <p className="text-xs font-semibold text-muted-foreground uppercase">
//                       {product.options?.[1]?.name || "Option 2"}
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {variantOptions.option2.slice(0, 3).map((option, idx) => (
//                         <Badge key={idx} variant="secondary" className="text-xs">
//                           {option}
//                         </Badge>
//                       ))}
//                       {variantOptions.option2.length > 3 && (
//                         <Badge variant="secondary" className="text-xs">
//                           +{variantOptions.option2.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {variantOptions.option3 && variantOptions.option3.length > 0 && (
//                   <div className="space-y-1">
//                     <p className="text-xs font-semibold text-muted-foreground uppercase">
//                       {product.options?.[2]?.name || "Option 3"}
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {variantOptions.option3.slice(0, 3).map((option, idx) => (
//                         <Badge key={idx} variant="secondary" className="text-xs">
//                           {option}
//                         </Badge>
//                       ))}
//                       {variantOptions.option3.length > 3 && (
//                         <Badge variant="secondary" className="text-xs">
//                           +{variantOptions.option3.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }


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
  // Get first image or use placeholder
  const imageUrl = product.images?.[0]?.src || product.variants?.[0]?.featured_image?.src

  // Get price from first variant
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

        {/* Discount Badge */}
        {/* {compareAtPrice && price && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground">
              {Math.round(
                ((Number.parseFloat(compareAtPrice) - Number.parseFloat(price)) / Number.parseFloat(compareAtPrice)) *
                  100,
              )}
              % OFF
            </Badge>
          </div>
        )} */}
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
