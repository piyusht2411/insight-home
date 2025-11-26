"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductsContent } from "@/components/ProductContent"
import { Spinner } from "@/components/ui/spinner"

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  )
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const website = searchParams.get("website")

  if (!website) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid URL</h1>
          <p className="text-muted-foreground">Please provide a valid website URL</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsContent website={website} />
    </Suspense>
  )
}
