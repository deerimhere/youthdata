"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Search,
  MapPin,
  Building,
  Clock,
  Heart,
  Bookmark,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const jobs = [
    {
      id: 1,
      title: "웹 프론트엔드 개발자",
      company: "테크스타트",
      location: "서울 강남구",
      salary: "3,600만원",
      type: "정규직",
      deadline: "12.31",
      posted: "3일 전",
      tags: ["React", "TypeScript", "신입가능"],
      isHot: true,
      matchScore: 95,
    },
    {
      id: 2,
      title: "백엔드 개발자",
      company: "그로스랩",
      location: "서울 마포구",
      salary: "4,000만원",
      type: "정규직",
      deadline: "12.25",
      posted: "1일 전",
      tags: ["Node.js", "AWS", "경력 1년↑"],
      isHot: false,
      matchScore: 87,
    },
    {
      id: 3,
      title: "UI/UX 디자이너",
      company: "디자인허브",
      location: "경기 성남시",
      salary: "3,200만원",
      type: "정규직",
      deadline: "12.20",
      posted: "5일 전",
      tags: ["Figma", "Adobe XD", "신입가능"],
      isHot: false,
      matchScore: 82,
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
            <h1 className="text-lg font-bold text-gray-900">일자리 찾기</h1>
            <p className="text-xs text-gray-500">워크넷 연계 채용정보</p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="직무, 기업명 검색"
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
          <FilterTag label="인기" isActive />
          <FilterTag label="지역별" />
          <FilterTag label="직무별" />
          <FilterTag label="급여순" />
          <FilterTag label="신입가능" />
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">총 </span>
            <span className="text-sm font-semibold text-blue-600">{jobs.length}개</span>
            <span className="text-sm text-gray-600"> 일자리</span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            정렬
          </Button>
        </div>
      </div>

      {/* Job List */}
      <div className="px-4 py-4 space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Load More */}
      <div className="px-4 pb-4">
        <Button variant="outline" className="w-full py-3 rounded-xl border-gray-200">
          더 많은 일자리 보기
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

function JobCard({ job }: { job: any }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-base">{job.title}</h3>
              {job.isHot && <Badge className="bg-blue-50 text-blue-600 text-xs border-0">HOT</Badge>}
            </div>
            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {job.posted} • 마감 {job.deadline}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {job.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right ml-4">
            <div className="text-lg font-bold text-gray-900 mb-1">{job.salary}</div>
            <div className="text-xs text-gray-500 mb-2">{job.type}</div>
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-xs text-gray-500">매칭도</span>
              <span className="text-sm font-bold text-blue-600">{job.matchScore}%</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Bookmark className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1 rounded-xl border-gray-200">
            상세보기
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">지원하기</Button>
        </div>
      </CardContent>
    </Card>
  )
}
