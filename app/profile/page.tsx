"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  Settings,
  MapPin,
  Briefcase,
  Home,
  Heart,
  Clock,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Edit,
} from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar Spacer */}
      <div className="h-11 bg-white"></div>

      {/* App Header */}
      <header className="bg-white text-gray-900 px-4 py-4 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">내 프로필</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 p-2">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Profile Card */}
        <Card className="mb-6 bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <User className="absolute inset-0 h-full w-full p-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">김청년</h2>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>서울 강남구</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-blue-50 text-blue-600 text-xs border-0">청년</Badge>
                  <Badge className="bg-gray-100 text-gray-600 text-xs border-0">인증완료</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-gray-200">
                <Edit className="w-4 h-4 mr-1" />
                수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center text-gray-900 mb-3">
                <Briefcase className="h-5 w-5 mr-2" />
                <span className="font-semibold">일자리 선호</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">직종</span>
                  <span className="font-medium text-gray-900">IT/개발</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">지역</span>
                  <span className="font-medium text-gray-900">서울 강남/마포</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연봉</span>
                  <span className="font-medium text-blue-600">3,500만원 이상</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center text-gray-900 mb-3">
                <Home className="h-5 w-5 mr-2" />
                <span className="font-semibold">주거 선호</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">유형</span>
                  <span className="font-medium text-gray-900">원룸/투룸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">지역</span>
                  <span className="font-medium text-gray-900">서울 전역</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">월세</span>
                  <span className="font-medium text-blue-600">40만원 이하</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">내 활동</h3>
          <div className="space-y-3">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">관심 목록</h4>
                      <p className="text-sm text-gray-600">일자리 3개, 주거 2개</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">신청 내역</h4>
                      <p className="text-sm text-gray-600">진행중 1개, 완료 2개</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">최근 활동</h3>
          <div className="space-y-3">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="LH 청년 매입임대주택"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">LH 청년 매입임대주택</h4>
                    <p className="text-sm text-gray-600">서울 강남구 역삼동</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>3일 전 관심 등록</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 text-xs border-0">신청완료</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">웹 프론트엔드 개발자</h4>
                    <p className="text-sm text-gray-600">테크스타트</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>5일 전 지원</span>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-600 text-xs border-0">서류검토중</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <MenuButton icon={<Bell className="w-5 h-5" />} label="알림 설정" />
          <MenuButton icon={<HelpCircle className="w-5 h-5" />} label="도움말 및 FAQ" />
          <MenuButton icon={<LogOut className="w-5 h-5" />} label="로그아웃" isDestructive />
        </div>
      </div>
    </div>
  )
}

function MenuButton({
  icon,
  label,
  isDestructive = false,
}: {
  icon: React.ReactNode
  label: string
  isDestructive?: boolean
}) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${isDestructive ? "text-gray-500" : "text-gray-600"}`}>{icon}</div>
            <span className={`font-medium ${isDestructive ? "text-gray-500" : "text-gray-900"}`}>{label}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}
