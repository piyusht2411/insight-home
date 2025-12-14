"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    try {
      setIsLoading(true)
      let cleanUrl = url.trim()

      if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
        cleanUrl = "https://" + cleanUrl
      }

      new URL(cleanUrl)

      router.push(`/onboarding?website=${cleanUrl}`)
      onOpenChange(false)
    } catch (error) {
      console.error("Invalid URL:", error)
      alert("Please enter a valid URL")
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Connect Your Store</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your Shopify or WooCommerce URL to get started
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="https://yourstore.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 bg-input border-border/50 text-foreground placeholder-muted-foreground h-12"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!url.trim() || isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
          >
            {isLoading ? "Connecting..." : "Connect Store"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
