"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Target, ArrowRight, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import type { SurveyResult } from "@/lib/types/survey"

interface SurveyResultProps {
  result: SurveyResult
  onRestart: () => void
}

export default function SurveyResultComponent({ result, onRestart }: SurveyResultProps) {
  const router = useRouter()

  const handleJobExplore = (job: string) => {
    // 직업명을 기반으로 학습 페이지로 이동하는 로직
    // 실제로는 직업명과 jobId를 매핑하는 로직이 필요할 수 있습니다
    router.push("/explore")
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 결과 헤더 */}
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">당신의 관심 분야를 찾았어요! 🎉</h1>
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
            <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 floating-animation" />
          </div>
        </div>
        <p className="text-xl text-muted-foreground">질문에 답해주신 내용을 바탕으로 맞춤 직업을 추천해드려요</p>
      </div>

      {/* 주요 관심 분야 */}
      <Card className="glass-card border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text flex items-center">
            <Target className="h-6 w-6 mr-3" />
            주요 관심 분야
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="text-lg px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg"
            >
              {result.primaryCategory}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 세부 관심 분야 */}
      {result.secondaryCategories.length > 0 && (
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold gradient-text">세부 관심 분야</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.secondaryCategories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 glass-card border-blue-200/50 text-blue-600 dark:text-blue-400"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 추천 직업 */}
      <Card className="glass-card border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold gradient-text">추천 직업</CardTitle>
          <p className="text-muted-foreground">당신의 관심사와 잘 맞는 직업들을 선별했어요</p>
        </CardHeader>
        <CardContent>
          {result.recommendedJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.recommendedJobs.slice(0, 9).map((job, index) => (
                <Card
                  key={index}
                  className="glass-card border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                  onClick={() => handleJobExplore(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{job}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">
                죄송해요, 현재 매칭되는 직업 정보가 없습니다. <br />
                다른 답변을 시도해보시거나 전체 직업 탐색을 이용해보세요.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestart}
          variant="outline"
          className="glass-card border-white/20 hover:bg-white/10"
          size="lg"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          다시 테스트하기
        </Button>
        <Button
          onClick={() => router.push("/explore")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <Target className="h-5 w-5 mr-2" />
          전체 직업 탐색하기
        </Button>
      </div>
    </div>
  )
}
