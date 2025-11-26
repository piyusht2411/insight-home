"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  // Generate page numbers to display
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Calculate start and end of middle range
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    if (currentPage <= 2) {
      end = 4
    } else if (currentPage >= totalPages - 1) {
      start = totalPages - 3
    }

    // Add ellipsis if needed
    if (start > 2) {
      pages.push("...")
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push("...")
    }

    // Always show last page
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="border-border/50"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={currentPage === page ? "bg-primary text-primary-foreground border-primary" : "border-border/50"}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="border-border/50"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
