import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, MapPin, Clock, Briefcase, GraduationCap, Home } from "lucide-react"
import Link from "next/link"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  // 실제 구현에서는 API에서 데이터를 가져옵니다
  const job = {
    id: params.id,
    title: "웹 프론트엔드 개발자",
    company: "테크스타트",
    location: "서울 강남구",
    salary: "3,600만원",
    type: "정규직",
    postedAt: "2023년 6월 10일",
    deadline: "2023년 7월 10일",
    description:
      "테크스타트는 혁신적인 웹 서비스를 개발하는 스타트업입니다. 우리는 사용자 경험을 중시하며, 최신 기술을 활용하여 웹 애플리케이션을 개발합니다. 프론트엔드 개발자로서 React와 TypeScript를 활용한 웹 애플리케이션 개발에 참여하게 됩니다.",
    requirements: [
      "HTML, CSS, JavaScript에 대한 깊은 이해",
      "React, TypeScript 개발 경험",
      "반응형 웹 디자인 경험",
      "Git을 이용한 버전 관리 경험",
    ],
    benefits: ["유연한 근무 시간", "원격 근무 가능", "최신 장비 지원", "교육비 지원"],
    tags: ["React", "TypeScript", "신입가능"],
    nearbyHousing: [
      {
        id: 1,
        title: "LH 청년 매입임대주택",
        location: "서울 강남구 역삼동",
        distance: "도보 15분",
        deposit: "1,000만원",
        monthly: "30만원",
      },
      {
        id: 2,
        title: "SH 행복주택",
        location: "서울 강남구 삼성동",
        distance: "도보 20분",
        deposit: "1,200만원",
        monthly: "28만원",
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold">채용 정보</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex items-center text-gray-600 mt-2">
              <Building className="h-4 w-4 mr-1" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">급여</div>
                <div className="font-semibold text-blue-600">{job.salary}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">고용형태</div>
                <div className="font-semibold">{job.type}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">등록일</div>
                <div className="font-semibold">{job.postedAt}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">마감일</div>
                <div className="font-semibold">{job.deadline}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                직무 설명
              </h3>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                자격 요건
              </h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">복리후생</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center mb-3">
            <Home className="h-5 w-5 mr-2" />
            인근 주거 옵션
          </h3>

          <div className="space-y-3">
            {job.nearbyHousing.map((housing) => (
              <Card key={housing.id}>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{housing.title}</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{housing.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>직장까지 {housing.distance}</span>
                  </div>
                  <div className="font-medium text-blue-600 mt-1">
                    보증금 {housing.deposit} / 월 {housing.monthly}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    상세 보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            관심 등록
          </Button>
          <Button className="flex-1">지원하기</Button>
        </div>
      </main>
    </div>
  )
}
