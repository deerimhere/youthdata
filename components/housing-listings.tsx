"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Banknote, Clock, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import AnimatedButton from "@/components/animated-button"
import AnimatedHeart from "@/components/animated-heart"
import AnimatedBookmark from "@/components/animated-bookmark"
import AnimatedSearch from "@/components/animated-search"
import AnimatedCounter from "@/components/animated-counter"
import ToastNotification from "@/components/toast-notification"

export default function HousingListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error" | "info" | "warning"
    show: boolean
  } | null>(null)

  const housings = [
    {
      id: 1,
      title: "LH 청년 매입임대주택",
      location: "서울 강남구 역삼동",
      type: "원룸",
      size: "18㎡",
      deposit: "1,000만원",
      monthly: "30만원",
      postedAt: "2일 전",
      distance: "직장까지 15분",
      tags: ["청년전용", "역세권", "즉시입주"],
      image: "/placeholder.svg?height=120&width=120",
      isRecommended: true,
      matchScore: 92,
      priceGrade: "A+",
    },
    {
      id: 2,
      title: "빈집 리모델링 주택",
      location: "경기 파주시 금촌동",
      type: "투룸",
      size: "33㎡",
      deposit: "500만원",
      monthly: "25만원",
      postedAt: "1일 전",
      distance: "직장까지 10분",
      tags: ["리모델링완료", "주차가능", "즉시입주"],
      image: "/placeholder.svg?height=120&width=120",
      isRecommended: false,
      matchScore: 85,
      priceGrade: "A",
    },
    {
      id: 3,
      title: "SH 행복주택",
      location: "서울 마포구 상암동",
      type: "원룸",
      size: "21㎡",
      deposit: "1,200만원",
      monthly: "28만원",
      postedAt: "5일 전",
      distance: "직장까지 25분",
      tags: ["청년전용", "역세권", "신축"],
      image: "/placeholder.svg?height=120&width=120",
      isRecommended: true,
      matchScore: 88,
      priceGrade: "A+",
    },
  ]

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ message, type, show: true })
  }

  const handleLike = (housingId: number, liked: boolean) => {
    const housing = housings.find((h) => h.id === housingId)
    showToast(
      liked
        ? `${housing?.title}을(를) 관심 목록에 추가했습니다! ❤️`
        : `${housing?.title}을(를) 관심 목록에서 제거했습니다.`,
      liked ? "success" : "info",
    )
  }

  const handleBookmark = (housingId: number, bookmarked: boolean) => {
    const housing = housings.find((h) => h.id === housingId)
    showToast(
      bookmarked
        ? `${housing?.title}을(를) 북마크에 저장했습니다! 📚`
        : `${housing?.title}을(를) 북마크에서 제거했습니다.`,
      bookmarked ? "success" : "info",
    )
  }

  const handleApply = (housingId: number) => {
    const housing = housings.find((h) => h.id === housingId)
    showToast(`${housing?.title}에 신청했습니다! 🏠`, "success")
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <AnimatedSearch placeholder="지역, 주택유형 검색" onSearch={setSearchQuery} />

      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <AnimatedButton
          variant="gradient"
          size="sm"
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-full px-4 whitespace-nowrap"
        >
          🏆 추천
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-green-50"
        >
          🏢 공공임대
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-blue-50"
        >
          🏠 빈집활용
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-purple-50"
        >
          💰 보증금순
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-orange-50"
        >
          ⚡ 즉시입주
        </AnimatedButton>
      </div>

      {/* Housing Cards */}
      <div className="space-y-4">
        {housings.map((housing) => (
          <Card
            key={housing.id}
            className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Image src={housing.image || "/placeholder.svg"} alt={housing.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge
                      className={`text-xs font-bold animate-pulse ${
                        housing.priceGrade === "A+"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500"
                      } text-white border-0`}
                    >
                      {housing.priceGrade}
                    </Badge>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                          {housing.title}
                        </h3>
                        {housing.isRecommended && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs animate-pulse">
                            ✨ 추천
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{housing.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Home className="h-4 w-4 mr-1" />
                        <span>
                          {housing.type} · {housing.size}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <AnimatedCounter
                          value={housing.matchScore}
                          suffix="%"
                          className="text-sm font-semibold text-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 mb-3 group-hover:from-blue-100 group-hover:to-green-100 transition-colors duration-300">
                    <div className="flex items-center font-bold text-lg text-gray-900">
                      <Banknote className="h-5 w-5 mr-2 text-green-600" />
                      <span className="text-blue-600">보증금 {housing.deposit}</span>
                      <span className="mx-2 text-gray-400">/</span>
                      <span className="text-green-600">월 {housing.monthly}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {housing.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 border-0 rounded-full px-3 py-1 text-xs hover:bg-green-100 hover:text-green-700 transition-colors duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{housing.postedAt}</span>
                      <span className="mx-2">•</span>
                      <span>{housing.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AnimatedHeart onToggle={(liked) => handleLike(housing.id, liked)} size="md" />
                      <AnimatedBookmark onToggle={(bookmarked) => handleBookmark(housing.id, bookmarked)} size="md" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <AnimatedButton variant="outline" className="flex-1 border-gray-200 rounded-xl hover:bg-gray-50">
                  상세 보기
                </AnimatedButton>
                <AnimatedButton
                  variant="gradient"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
                  onClick={() => handleApply(housing.id)}
                >
                  신청하기
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <AnimatedButton variant="outline" className="border-gray-200 rounded-full px-8 py-3 hover:bg-green-50">
          <TrendingUp className="w-4 h-4 mr-2" />더 많은 주거 보기
        </AnimatedButton>
      </div>

      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          isVisible={toast.show}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
