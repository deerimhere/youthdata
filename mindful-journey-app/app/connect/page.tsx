"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw, MapPin, Sparkles } from "lucide-react"
import { getRelevantResources, resourceCategoryIcons } from "@/lib/api/mock-data"
import type { Resource } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ConnectPage() {
  const [recommendedResources, setRecommendedResources] = useState<Resource[]>([])
  const userName = "OO"

  const fetchResources = () => {
    setRecommendedResources(getRelevantResources())
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const categoryGradients = {
    주거: "from-blue-500 to-cyan-500",
    일자리: "from-green-500 to-emerald-500",
    제도: "from-purple-500 to-violet-500",
  }

  return (
    <div className="min-h-screen py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            {userName}님, 새로운 가능성을 <br className="md:hidden" />
            연결해 보세요
          </h1>
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 floating-animation" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            관심사를 바탕으로 할 수 있는 일과 공간, 지원 제도를 부드럽게 안내해 드려요
          </p>
          <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg font-medium">
              <span className="text-red-500">"이젠 나가야 한다"</span>가 아니라, <br className="md:hidden" />
              <span className="text-green-500">"갈 수 있는 곳이 있다"</span>는 감각을 제공하고 싶어요 ✨
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {recommendedResources.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recommendedResources.map((resource, index) => {
            const Icon = resourceCategoryIcons[resource.category]
            const gradient = categoryGradients[resource.category]

            return (
              <Card
                key={resource.id}
                className="glass-card border-0 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    gradient.replace("from-", "from-").replace("to-", "to-") + "/5",
                  )}
                ></div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-full bg-gradient-to-r shadow-lg", gradient)}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r text-white",
                        gradient,
                      )}
                    >
                      {resource.category}
                    </div>
                  </div>

                  <CardTitle className="text-xl md:text-2xl font-bold gradient-text">{resource.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{resource.description}</CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  {resource.details && (
                    <div className="glass-card p-4 rounded-xl">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium leading-relaxed">{resource.details}</p>
                      </div>
                    </div>
                  )}

                  {resource.link && (
                    <Button
                      asChild
                      className={cn(
                        "w-full bg-gradient-to-r text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                        gradient,
                      )}
                    >
                      <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                        자세히 보기 <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
            <RefreshCw className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-spin" />
            <p className="text-lg text-muted-foreground">
              추천 정보를 불러오는 중이거나, <br />
              아직 준비된 정보가 없습니다.
            </p>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <Button
          onClick={fetchResources}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <RefreshCw className="h-5 w-5 mr-2" /> 다른 추천 보기
        </Button>
      </div>
    </div>
  )
}

ConnectPage.defaultProps = {}
