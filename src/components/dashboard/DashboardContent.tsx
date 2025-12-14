"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { PaginationControls } from "@/components/PaginationControls";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { useSearchParams } from "next/navigation";

const analyticsData = [
  {
    label: "Total Sales",
    value: "$45,231",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    label: "Active Campaigns",
    value: "24",
    change: "+3",
    icon: Target,
    color: "text-blue-500",
  },
  {
    label: "Competitors Tracked",
    value: "8",
    change: "0",
    icon: Users,
    color: "text-purple-500",
  },
  {
    label: "Growth Rate",
    value: "18.2%",
    change: "+2.4%",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

interface DashboardContentProps {
  onProductClick: (product: any) => void;
}

const ITEMS_PER_PAGE = 12;

export function DashboardContent({ onProductClick }: DashboardContentProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const website = searchParams.get("website");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!website) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `${website}/products.json?limit=100`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [website]); // Added website to deps for refetch on param change

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store
        </p>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-sm font-medium text-green-500">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Products Section */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onProductClick(product)}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center">
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}