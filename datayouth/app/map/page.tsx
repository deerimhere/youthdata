"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BriefcaseIcon, HomeIcon, LayersIcon, FilterIcon } from "lucide-react"

export default function MapPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-blue-600">지도 보기</h1>
          <Button variant="outline" size="icon">
            <FilterIcon className="w-4 h-4" />
            <span className="sr-only">필터</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* 지도 영역 - 실제 구현에서는 카카오맵 API를 사용합니다 */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-500 mb-2">카카오맵 API 연동</div>
            <div className="text-sm text-gray-400">실제 구현 시 지도가 표시됩니다</div>
          </div>
        </div>

        {/* 지도 위에 표시되는 컨트롤 */}
        <div className="absolute top-4 left-0 right-0 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white rounded-lg shadow-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="jobs">일자리</TabsTrigger>
              <TabsTrigger value="housing">주거</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 하단 카드 영역 */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="space-y-2">
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">웹 프론트엔드 개발자</h3>
                  <p className="text-sm text-gray-500">서울 강남구 · 테크스타트</p>
                </div>
                <Button size="sm">보기</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <HomeIcon className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">LH 청년 매입임대주택</h3>
                  <p className="text-sm text-gray-500">서울 강남구 역삼동</p>
                </div>
                <Button size="sm">보기</Button>
              </CardContent>
            </Card>

            <Button variant="default" className="w-full">
              <LayersIcon className="h-4 w-4 mr-2" />
              일자리-주거 매칭 보기
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
