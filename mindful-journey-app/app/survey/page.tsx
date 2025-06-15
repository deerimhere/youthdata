"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Brain, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import QuestionCard from "@/components/survey/question-card"
import SurveyResultComponent from "@/components/survey/survey-result"
import {
  loadInitialQuestions,
  loadCategoryQuestions,
  loadJobMappings,
  calculatePrimaryCategory,
  calculateSecondaryCategories,
  getRecommendedJobs,
} from "@/lib/utils/survey-data"
import type { InitialQuestion, CategoryQuestion, JobMapping, SurveyResult } from "@/lib/types/survey"

type SurveyStep = "intro" | "initial" | "category" | "result"

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>("intro")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [initialQuestions, setInitialQuestions] = useState<InitialQuestion[]>([])
  const [categoryQuestions, setCategoryQuestions] = useState<CategoryQuestion[]>([])
  const [jobMappings, setJobMappings] = useState<JobMapping[]>([])
  const [initialAnswers, setInitialAnswers] = useState<{ [key: string]: boolean }>({})
  const [categoryAnswers, setCategoryAnswers] = useState<{ [key: string]: boolean }>({})
  const [primaryCategory, setPrimaryCategory] = useState<string>("")
  const [result, setResult] = useState<SurveyResult | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [questions1, questions2, mappings] = await Promise.all([
          loadInitialQuestions(),
          loadCategoryQuestions(),
          loadJobMappings(),
        ])

        setInitialQuestions(questions1)
        setCategoryQuestions(questions2)
        setJobMappings(mappings)
      } catch (error) {
        console.error("Failed to load survey data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleInitialAnswer = (answer: boolean) => {
    const question = initialQuestions[currentQuestionIndex]
    const newAnswers = { ...initialAnswers, [question.QID]: answer }
    setInitialAnswers(newAnswers)

    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 1단계 완료, 주요 카테고리 계산
      const primary = calculatePrimaryCategory(newAnswers, initialQuestions)
      setPrimaryCategory(primary)

      // 2단계 질문 필터링
      const filteredQuestions = categoryQuestions.filter((q) => q.Category1 === primary)
      setCategoryQuestions(filteredQuestions)

      setCurrentStep("category")
      setCurrentQuestionIndex(0)
    }
  }

  const handleCategoryAnswer = (answer: boolean) => {
    const question = categoryQuestions[currentQuestionIndex]
    const newAnswers = { ...categoryAnswers, [question.Category2]: answer }
    setCategoryAnswers(newAnswers)

    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 2단계 완료, 결과 계산
      const secondaryCategories = calculateSecondaryCategories(newAnswers, categoryQuestions)
      const recommendedJobs = getRecommendedJobs(primaryCategory, secondaryCategories, jobMappings)

      setResult({
        primaryCategory,
        secondaryCategories,
        recommendedJobs,
      })

      setCurrentStep("result")
    }
  }

  const restartSurvey = () => {
    setCurrentStep("intro")
    setCurrentQuestionIndex(0)
    setInitialAnswers({})
    setCategoryAnswers({})
    setPrimaryCategory("")
    setResult(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 animate-pulse text-purple-500" />
          <p className="text-xl">설문 데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (currentStep === "intro") {
    return (
      <div className="min-h-screen flex flex-col justify-center space-y-12 text-center">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="glass-card border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            뒤로가기
          </Button>
        </div>

        {/* Intro Content */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">나에게 맞는 분야 찾기</h1>
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4">
              <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-yellow-400 floating-animation" />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              간단한 질문들을 통해 당신의 관심사와 <br />
              <span className="text-purple-600 dark:text-purple-400 font-medium">잘 맞는 직업 분야</span>를 찾아드려요
            </p>

            <Card className="glass-card border-0 shadow-2xl max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold gradient-text">설문 안내</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">1단계: 기본 관심사 파악</h4>
                    <p className="text-sm text-muted-foreground">15개의 질문으로 주요 관심 분야를 찾아요</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">2단계: 세부 분야 탐색</h4>
                    <p className="text-sm text-muted-foreground">관심 분야의 구체적인 영역을 선택해요</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">3단계: 맞춤 직업 추천</h4>
                    <p className="text-sm text-muted-foreground">당신에게 딱 맞는 직업들을 추천해드려요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => setCurrentStep("initial")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Brain className="h-5 w-5 mr-2" />
            설문 시작하기
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === "initial" && initialQuestions.length > 0) {
    const currentQuestion = initialQuestions[currentQuestionIndex]
    return (
      <div className="min-h-screen flex flex-col justify-center space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">1단계: 기본 관심사</h1>
          <p className="text-lg text-muted-foreground">각 질문에 솔직하게 답변해주세요</p>
        </div>

        <QuestionCard
          question={currentQuestion.Question1}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={initialQuestions.length}
          onAnswer={handleInitialAnswer}
          selectedAnswer={initialAnswers[currentQuestion.QID] ?? null}
        />
      </div>
    )
  }

  if (currentStep === "category" && categoryQuestions.length > 0) {
    const currentQuestion = categoryQuestions[currentQuestionIndex]
    return (
      <div className="min-h-screen flex flex-col justify-center space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">2단계: 세부 분야</h1>
          <p className="text-lg text-muted-foreground">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">{primaryCategory}</span> 분야의
            구체적인 관심사를 선택해주세요
          </p>
        </div>

        <QuestionCard
          question={currentQuestion.Question2}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={categoryQuestions.length}
          onAnswer={handleCategoryAnswer}
          selectedAnswer={categoryAnswers[currentQuestion.Category2] ?? null}
        />
      </div>
    )
  }

  if (currentStep === "result" && result) {
    return (
      <div className="min-h-screen py-12">
        <SurveyResultComponent result={result} onRestart={restartSurvey} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-xl">설문을 준비하는 중...</p>
      </div>
    </div>
  )
}

SurveyPage.defaultProps = {}
