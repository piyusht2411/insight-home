"use client"

import { Suspense } from "react"
import { OnboardingFlow } from "@/components/OnboardingFlow"
import { Spinner } from "@/components/ui/spinner"

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OnboardingFlow />
    </Suspense>
  )
}
