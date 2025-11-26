import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Zap, Target } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get instant insights into your product catalog with real-time data analysis",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Identify patterns and trends in your product performance",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Analyze your entire product catalog in seconds",
  },
  {
    icon: Target,
    title: "Actionable Insights",
    description: "Get recommendations to optimize your product strategy",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze and optimize your product insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
