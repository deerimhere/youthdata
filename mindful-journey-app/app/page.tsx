"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { interests, getJobSuggestionsByInterest } from "@/lib/api/mock-data"
import type { JobSuggestion, Interest } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Heart, ArrowRight, Sparkles, Target, Coffee } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)
  const [suggestedJobs, setSuggestedJobs] = useState<JobSuggestion[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const handleInterestSelect = (interest: Interest) => {
    setSelectedInterest(interest)
    setSuggestedJobs(getJobSuggestionsByInterest(interest.id))
    setShowResults(true)
  }

  const handleJobClick = (jobId: string) => {
    router.push(`/learn?curriculum=${jobId}`)
  }

  const resetSelection = () => {
    setSelectedInterest(null)
    setSuggestedJobs([])
    setShowResults(false)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center space-y-16 text-center relative">
      {!showResults ? (
        <>
          {/* Hero Section */}
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="gradient-text">어떤 분야에</span>
                  <br />
                  <span className="gradient-text">관심이 있으신가요?</span>
                </h1>
                <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8">
                  <Heart className="h-8 w-8 md:h-12 md:w-12 text-pink-400 floating-animation" />
                </div>
              </div>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-r from-slate-500/10 to-purple-500/10">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Coffee className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  <span className="text-lg font-semibold gradient-text">밑그림의 철학</span>
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  우리는 <span className="font-semibold text-slate-700 dark:text-slate-300">'해야 할 일'</span>을
                  제시하기보다,
                  <br />
                  <span className="font-semibold text-purple-700 dark:text-purple-300">'하고 싶은 마음'</span>을 다시
                  발견할 수 있도록 돕는 동반자입니다 ✨
                </p>
              </div>
            </div>
          </div>

          {/* Interest Selection */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-muted-foreground">
              편안하게 선택해보세요. 모든 선택이 의미있습니다 🌟
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
              {interests.map((interest, index) => {
                const Icon = interest.icon
                const gradients = [
                  "from-pink-500 to-rose-500",
                  "from-blue-500 to-cyan-500",
                  "from-green-500 to-emerald-500",
                  "from-purple-500 to-violet-500",
                  "from-orange-500 to-amber-500",
                ]

                return (
                  <div
                    key={interest.id}
                    className="emotion-card group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleInterestSelect(interest)}
                  >
                    <div className="p-6 md:p-8 rounded-3xl transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 glass-card hover:shadow-xl">
                      <div className="flex flex-col items-center space-y-4">
                        <div
                          className={cn(
                            "p-4 rounded-full transition-all duration-300 bg-gradient-to-br",
                            gradients[index] + "/20 group-hover:" + gradients[index] + "/30",
                          )}
                        >
                          <Icon className={cn("h-8 w-8 md:h-10 md:w-10 transition-all duration-300", interest)} />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-foreground">{interest.name}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        /* Results Section */
        <div className="space-y-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="space-y-6">
            <Button
              onClick={resetSelection}
              variant="outline"
              className="glass-card border-white/20 hover:bg-white/10 mb-4"
            >
              ← 다시 선택하기
            </Button>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">
                <span className="text-purple-600 dark:text-purple-400">{selectedInterest?.name}</span>에 관심있는 당신을
                위한
              </h1>
              <p className="text-xl md:text-2xl gradient-text font-semibold">맞춤 큐레이션이에요 ✨</p>
            </div>

            <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              <p className="text-lg leading-relaxed">
                이 서비스는 단순히 집과 일을 연결해주는 것이 아니라,
                <br />
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  '내가 다시 살아갈 수 있다는 감각'
                </span>
                을 주는 플랫폼이에요 💙
              </p>
            </div>
          </div>

          {/* Job Suggestions */}
          {suggestedJobs.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-muted-foreground">
                이런 길들이 당신을 기다리고 있어요
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {suggestedJobs.map((job, index) => (
                  <Card
                    key={job.id}
                    className="glass-card border-0 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group cursor-pointer"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <CardHeader className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <Target className="h-6 w-6 text-purple-500" />
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold gradient-text">{job.title}</CardTitle>
                      <p className="text-base leading-relaxed text-muted-foreground">{job.description}</p>
                    </CardHeader>

                    <CardContent className="relative space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">하루 일과 흐름</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4">{job.dailyRoutine}</p>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">학습 커리큘럼 보기</span>
                          </div>
                          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                            클릭하여 시작 →
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Next Steps */}
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4">다음 단계는 어떨까요?</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/survey">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        관심 분야 찾기 🧭
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        학습으로 역량 키우기 📚
                      </Button>
                    </Link>
                    <Link href="/connect">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        실제 기회 연결하기 🔗
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-purple-600 dark:text-purple-400">감정적 안전지대</span>에서
                    <br />
                    천천히 당신만의 속도로 나아가세요 🌱
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4 floating-animation" />
                <p className="text-lg text-muted-foreground">
                  '{selectedInterest?.name}' 관련 정보를 준비 중입니다. <br />
                  조금만 기다려주세요!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

HomePage.defaultProps = {}
