import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, HomeIcon, ArrowRightIcon, TimerIcon, Star, Zap } from "lucide-react"

interface RecommendationCardProps {
  title: string
  description: string
  jobCount: number
  housingCount: number
  distance: string
  matchScore: number
}

export default function RecommendationCard({
  title,
  description,
  jobCount,
  housingCount,
  distance,
  matchScore,
}: RecommendationCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{title}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">{matchScore}% 매칭</span>
              </div>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">추천</Badge>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BriefcaseIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{jobCount}개</div>
                <div className="text-xs text-gray-500">일자리</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <HomeIcon className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{housingCount}개</div>
                <div className="text-xs text-gray-500">주거</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TimerIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{distance}</div>
                <div className="text-xs text-gray-500">거리</div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl py-3 font-semibold shadow-lg">
          <span className="mr-2">자세히 보기</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
