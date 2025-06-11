"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Home, Clock, Heart, Bookmark, SlidersHorizontal, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function HousingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const housings = [
    {
      id: 1,
      title: "LH 청년 매입임대주택",
      location: "서울 강남구 역삼동",
      type: "원룸",
      size: "18㎡",
      deposit: "1,000만원",
      monthly: "30만원",
      available: "즉시입주",
      tags: ["청년전용", "역세권", "즉시입주"],
      source: "LH공사",
      image: "/placeholder.svg?height=100&width=100",
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
      available: "12.01 입주가능",
      tags: ["리모델링완료", "주차가능"],
      source: "국토부",
      image: "/placeholder.svg?height=100&width=100",
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
      available: "대기중",
      tags: ["청년전용", "신축"],
      source: "SH공사",
      image: "/placeholder.svg?height=100&width=100",
      matchScore: 88,
      priceGrade: "A+",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar Spacer */}
      <div className="h-11 bg-white"></div>

      {/* App Header */}
      <header className="bg-white text-gray-900 px-4 py-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">주거 지원</h1>
            <p className="text-xs text-gray-500">공공임대 및 빈집 활용</p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="지역, 주택유형 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-gray-200"
            />
          </div>
          <Button variant="outline" size="sm" className="px-3 py-3 rounded-xl border-gray-200">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
          <FilterTag label="추천" isActive />
          <FilterTag label="공공임대" />
          <FilterTag label="빈집활용" />
          <FilterTag label="보증금순" />
          <FilterTag label="즉시입주" />
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">총 </span>
            <span className="text-sm font-semibold text-blue-600">{housings.length}개</span>
            <span className="text-sm text-gray-600"> 주거 지원</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            정렬
          </Button>
        </div>
      </div>

      {/* Housing List */}
      <div className="px-4 py-4 space-y-4">
        {housings.map((housing) => (
          <HousingCard key={housing.id} housing={housing} />
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 pb-4">
        <Button variant="outline" className="w-full py-3 rounded-xl border-gray-200">
          더 많은 주거 정보 보기
        </Button>
      </div>
    </div>
  )
}

function FilterTag({ label, isActive = false }: { label: string; isActive?: boolean }) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      className={`rounded-full px-4 py-2 text-xs whitespace-nowrap ${
        isActive ? "bg-blue-600 text-white border-0" : "border-gray-200 text-gray-600 bg-white"
      }`}
    >
      {label}
    </Button>
  )
}

function HousingCard({ housing }: { housing: any }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
            <Image src={housing.image || "/placeholder.svg"} alt={housing.title} fill className="object-cover" />
            <div className="absolute top-1 left-1">
              <Badge className="bg-blue-600 text-white text-xs border-0">{housing.priceGrade}</Badge>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-base">{housing.title}</h3>
                  <Badge className="bg-gray-100 text-gray-600 text-xs border-0">{housing.source}</Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                    {housing.location}
                  </div>
                  <div className="flex items-center">
                    <Home className="w-3 h-3 mr-1 text-gray-400" />
                    {housing.type} · {housing.size}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-gray-400" />
                    {housing.available}
                  </div>
                </div>
              </div>
              <div className="text-right ml-3">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-xs font-bold text-blue-600">{housing.matchScore}%</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Bookmark className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-900">보증금 {housing.deposit}</div>
                  <div className="text-sm font-semibold text-gray-900">월세 {housing.monthly}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {housing.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 rounded-xl border-gray-200">
                상세보기
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">신청하기</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
