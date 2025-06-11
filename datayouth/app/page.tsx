"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Home,
  Briefcase,
  User,
  Bell,
  Search,
  MapPin,
  Building,
  ChevronRight,
  Heart,
  Bookmark,
  Menu,
} from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar Spacer */}
      <div className="h-11 bg-white"></div>

      {/* App Header */}
      <header className="bg-white text-gray-900 px-4 py-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">청년 내:일집</h1>
              <p className="text-xs text-gray-500">국토교통부</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4">
        {/* Quick Search */}
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="지역, 직종, 주거유형 검색"
              className="pl-12 pr-4 py-4 text-base bg-white border border-gray-200 rounded-xl shadow-sm"
            />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold mb-1 text-gray-900">1,247</div>
              <div className="text-xs text-gray-500">일자리</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold mb-1 text-gray-900">856</div>
              <div className="text-xs text-gray-500">주거</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold mb-1 text-gray-900">342</div>
              <div className="text-xs text-gray-500">매칭</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-95">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">일자리 찾기</h3>
              <p className="text-sm text-gray-500">워크넷 연계</p>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-95">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">주거 지원</h3>
              <p className="text-sm text-gray-500">공공임대</p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🎯 맞춤 추천</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              전체보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">완벽한 매칭!</h3>
                      <Badge className="bg-blue-50 text-blue-600 text-xs border-0">추천</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">강남구 IT 개발자 + 인근 LH 청년임대</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <Briefcase className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">1개</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">2개</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">15분</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">95%</div>
                    <div className="text-xs text-gray-500">매칭도</div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  자세히 보기
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">지역 정착 패키지</h3>
                      <Badge className="bg-gray-100 text-gray-600 text-xs border-0">신규</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">파주시 빈집 리모델링 + 지역 기업</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <Briefcase className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">3개</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">5개</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-gray-600">10분</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">87%</div>
                    <div className="text-xs text-gray-500">매칭도</div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  자세히 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">💼 최신 일자리</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              더보기
            </Button>
          </div>

          <JobCard
            title="웹 프론트엔드 개발자"
            company="테크스타트"
            location="서울 강남구"
            salary="3,600만원"
            tags={["React", "신입가능"]}
            isNew={true}
          />
        </div>

        {/* Recent Housing */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🏠 최신 주거</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              더보기
            </Button>
          </div>

          <HousingCard
            title="LH 청년 매입임대주택"
            location="서울 강남구 역삼동"
            type="원룸 · 18㎡"
            price="보증금 1,000만원 / 월 30만원"
            tags={["청년전용", "즉시입주"]}
            image="/placeholder.svg?height=80&width=80"
          />
        </div>
      </main>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          <TabButton
            icon={<Home className="w-5 h-5" />}
            label="홈"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <TabButton
            icon={<Briefcase className="w-5 h-5" />}
            label="일자리"
            isActive={activeTab === "jobs"}
            onClick={() => setActiveTab("jobs")}
          />
          <TabButton
            icon={<Home className="w-5 h-5" />}
            label="주거"
            isActive={activeTab === "housing"}
            onClick={() => setActiveTab("housing")}
          />
          <TabButton
            icon={<User className="w-5 h-5" />}
            label="마이"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </div>
      </nav>
    </div>
  )
}

function TabButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all active:scale-95 ${
        isActive ? "text-blue-600 bg-blue-50" : "text-gray-500"
      }`}
    >
      <div className={`transition-transform ${isActive ? "scale-110" : ""}`}>{icon}</div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

function JobCard({
  title,
  company,
  location,
  salary,
  tags,
  isNew,
}: {
  title: string
  company: string
  location: string
  salary: string
  tags: string[]
  isNew?: boolean
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {isNew && <Badge className="bg-blue-50 text-blue-600 text-xs border-0">NEW</Badge>}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Building className="w-3 h-3 mr-1 text-gray-400" />
                {company}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                {location}
              </div>
            </div>
          </div>
          <div className="text-right ml-3">
            <div className="text-lg font-bold text-gray-900">{salary}</div>
            <div className="flex space-x-1 mt-1">
              <Button variant="ghost" size="sm" className="p-1">
                <Heart className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <Bookmark className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">
              {tag}
            </Badge>
          ))}
        </div>
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
          지원하기
        </Button>
      </CardContent>
    </Card>
  )
}

function HousingCard({
  title,
  location,
  type,
  price,
  tags,
  image,
}: {
  title: string
  location: string
  type: string
  price: string
  tags: string[]
  image: string
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <div className="space-y-1 text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                {location}
              </div>
              <div className="flex items-center">
                <Home className="w-3 h-3 mr-1 text-gray-400" />
                {type}
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-900 mb-2">{price}</div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="p-1">
                <Heart className="w-4 h-4 text-gray-400" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <Bookmark className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs px-3">
              신청
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
