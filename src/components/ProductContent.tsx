"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./ProductCard"
import { PaginationControls } from "./PaginationControls"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  title: string
  vendor: string
  product_type: string
  handle: string
  images: any[]
  variants: any[]
  body_html: string
}

interface ProductsContentProps {
  website: string
}

const ITEMS_PER_PAGE = 12

export function ProductsContent({ website }: ProductsContentProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Remove trailing slash if present
        let apiUrl = website.endsWith("/") ? website.slice(0, -1) : website
        apiUrl = `${apiUrl}/products.json?limit=300`

        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid response format: expected products array")
        }

        setProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    if (website) {
      fetchProducts()
    }
  }, [website])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Error Loading Products</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Go Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // Calculate pagination
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-foreground">Product Insights</h1>
            <p className="text-muted-foreground">
              {products.length > 0
                ? `Showing ${paginatedProducts.length} of ${products.length} products`
                : "No products found"}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </main>
  )
}
