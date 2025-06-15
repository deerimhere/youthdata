"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  question: string
  questionNumber: number
  totalQuestions: number
  onAnswer: (answer: boolean) => void
  selectedAnswer?: boolean | null
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <Card className="glass-card border-0 shadow-2xl max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>질문 {questionNumber}</span>
            <span>
              {questionNumber}/{totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold gradient-text leading-relaxed pt-4">{question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "h-20 text-lg font-semibold transition-all duration-300 transform hover:scale-105",
              selectedAnswer === true
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg"
                : "glass-card border-white/20 hover:bg-green-500/10 hover:border-green-500/50",
            )}
            onClick={() => onAnswer(true)}
          >
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span>예</span>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={cn(
              "h-20 text-lg font-semibold transition-all duration-300 transform hover:scale-105",
              selectedAnswer === false
                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-500 shadow-lg"
                : "glass-card border-white/20 hover:bg-red-500/10 hover:border-red-500/50",
            )}
            onClick={() => onAnswer(false)}
          >
            <div className="flex flex-col items-center space-y-2">
              <XCircle className="h-6 w-6" />
              <span>아니오</span>
            </div>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">솔직한 답변이 더 정확한 추천으로 이어집니다 ✨</p>
        </div>
      </CardContent>
    </Card>
  )
}
