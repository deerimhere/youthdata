"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Clock, TrendingUp, Star } from "lucide-react"
import AnimatedButton from "@/components/animated-button"
import AnimatedHeart from "@/components/animated-heart"
import AnimatedBookmark from "@/components/animated-bookmark"
import AnimatedSearch from "@/components/animated-search"
import AnimatedCounter from "@/components/animated-counter"
import ToastNotification from "@/components/toast-notification"

export default function JobListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error" | "info" | "warning"
    show: boolean
  } | null>(null)

  const jobs = [
    {
      id: 1,
      title: "웹 프론트엔드 개발자",
      company: "테크스타트",
      location: "서울 강남구",
      salary: "3,600만원",
      type: "정규직",
      postedAt: "3일 전",
      distance: "주거지에서 20분",
      tags: ["React", "TypeScript", "신입가능"],
      isHot: true,
      matchScore: 95,
      companyLogo: "🚀",
    },
    {
      id: 2,
      title: "백엔드 개발자",
      company: "그로스랩",
      location: "서울 마포구",
      salary: "4,000만원",
      type: "정규직",
      postedAt: "1일 전",
      distance: "주거지에서 35분",
      tags: ["Node.js", "AWS", "경력 1년↑"],
      isHot: false,
      matchScore: 87,
      companyLogo: "💡",
    },
    {
      id: 3,
      title: "UI/UX 디자이너",
      company: "디자인허브",
      location: "경기 성남시",
      salary: "3,200만원",
      type: "정규직",
      postedAt: "5일 전",
      distance: "주거지에서 40분",
      tags: ["Figma", "Adobe XD", "신입가능"],
      isHot: true,
      matchScore: 82,
      companyLogo: "🎨",
    },
  ]

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ message, type, show: true })
  }

  const handleLike = (jobId: number, liked: boolean) => {
    const job = jobs.find((j) => j.id === jobId)
    showToast(
      liked ? `${job?.title}을(를) 관심 목록에 추가했습니다! ❤️` : `${job?.title}을(를) 관심 목록에서 제거했습니다.`,
      liked ? "success" : "info",
    )
  }

  const handleBookmark = (jobId: number, bookmarked: boolean) => {
    const job = jobs.find((j) => j.id === jobId)
    showToast(
      bookmarked ? `${job?.title}을(를) 북마크에 저장했습니다! 📚` : `${job?.title}을(를) 북마크에서 제거했습니다.`,
      bookmarked ? "success" : "info",
    )
  }

  const handleApply = (jobId: number) => {
    const job = jobs.find((j) => j.id === jobId)
    showToast(`${job?.title}에 지원했습니다! 🎉`, "success")
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <AnimatedSearch placeholder="직무, 지역, 기업명 검색" onSearch={setSearchQuery} />

      {/* Filter Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <AnimatedButton variant="gradient" size="sm" className="rounded-full px-4 whitespace-nowrap">
          🔥 인기
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-blue-50"
        >
          📍 지역별
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-green-50"
        >
          💼 직무별
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-purple-50"
        >
          💰 급여순
        </AnimatedButton>
        <AnimatedButton
          variant="outline"
          size="sm"
          className="border-gray-200 rounded-full px-4 whitespace-nowrap hover:bg-orange-50"
        >
          🌱 신입가능
        </AnimatedButton>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {job.companyLogo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      {job.isHot && (
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 text-xs animate-pulse">
                          🔥 HOT
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <AnimatedCounter
                      value={job.matchScore}
                      suffix="%"
                      className="text-sm font-semibold text-gray-700"
                    />
                  </div>
                  <div className="font-bold text-xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {job.salary}
                  </div>
                  <div className="text-sm text-gray-500">{job.type}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 border-0 rounded-full px-3 py-1 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{job.postedAt}</span>
                  <span className="mx-2">•</span>
                  <span>{job.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AnimatedHeart onToggle={(liked) => handleLike(job.id, liked)} size="md" />
                  <AnimatedBookmark onToggle={(bookmarked) => handleBookmark(job.id, bookmarked)} size="md" />
                </div>
              </div>

              <div className="flex space-x-3">
                <AnimatedButton variant="outline" className="flex-1 border-gray-200 rounded-xl hover:bg-gray-50">
                  상세 보기
                </AnimatedButton>
                <AnimatedButton variant="gradient" className="flex-1 rounded-xl" onClick={() => handleApply(job.id)}>
                  지원하기
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <AnimatedButton variant="outline" className="border-gray-200 rounded-full px-8 py-3 hover:bg-blue-50">
          <TrendingUp className="w-4 h-4 mr-2" />더 많은 일자리 보기
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
