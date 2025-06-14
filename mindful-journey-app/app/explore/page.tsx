"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { interests, getJobSuggestionsByInterest } from "@/lib/api/mock-data"
import type { JobSuggestion, Interest } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Sparkles, ArrowRight, Clock, Target } from "lucide-react"

export default function ExplorePage() {
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)
  const [suggestedJobs, setSuggestedJobs] = useState<JobSuggestion[]>([])

  const handleInterestSelect = (interest: Interest) => {
    setSelectedInterest(interest)
    setSuggestedJobs(getJobSuggestionsByInterest(interest.id))
  }

  return (
    <div className="min-h-screen py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">요즘 관심 있는 게 있나요?</h1>
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 floating-animation" />
          </div>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
          탐색 자체를 <span className="text-blue-600 dark:text-blue-400 font-medium">놀이처럼 유도</span>하여
          <br className="md:hidden" /> 당신의 가능성을 발견해보세요
        </p>
      </div>

      {/* Interest Selection */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
        {interests.map((interest, index) => {
          const Icon = interest.icon
          const isSelected = selectedInterest?.id === interest.id
          const gradients = [
            "from-pink-500 to-rose-500",
            "from-blue-500 to-cyan-500",
            "from-green-500 to-emerald-500",
            "from-purple-500 to-violet-500",
            "from-orange-500 to-amber-500",
          ]

          return (
            <Button
              key={interest.id}
              variant="ghost"
              className={cn(
                "h-auto p-0 overflow-hidden transition-all duration-500 transform hover:scale-105",
                isSelected && "scale-105",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleInterestSelect(interest)}
            >
              <div
                className={cn(
                  "px-6 py-4 md:px-8 md:py-6 rounded-2xl transition-all duration-500",
                  isSelected
                    ? `bg-gradient-to-r ${gradients[index]} text-white shadow-2xl`
                    : "glass-card hover:shadow-xl",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-3 rounded-full transition-all duration-300",
                      isSelected ? "bg-white/20" : "bg-gradient-to-br from-white/10 to-white/5",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-semibold">{interest.name}</span>
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Job Suggestions */}
      {selectedInterest && (
        <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-purple-600 dark:text-purple-400">{selectedInterest.name}</span> 분야에 관심있는
              당신에게
            </h2>
            <p className="text-xl text-muted-foreground">이런 직업들이 맞을지도 몰라요!</p>
          </div>

          {suggestedJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {suggestedJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className="glass-card border-0 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-6 w-6 text-purple-500" />
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold gradient-text">{job.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{job.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="relative space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">하루 일과 흐름</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-6">{job.dailyRoutine}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">맞춤 추천</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4 floating-animation" />
                <p className="text-lg text-muted-foreground">
                  '{selectedInterest.name}' 관련 직업 정보를 준비 중입니다. <br />
                  다른 관심사를 선택해보세요!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ExplorePage.defaultProps = {}
