import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Home, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HousingDetailPage({ params }: { params: { id: string } }) {
  // 실제 구현에서는 API에서 데이터를 가져옵니다
  const housing = {
    id: params.id,
    title: "LH 청년 매입임대주택",
    location: "서울 강남구 역삼동",
    type: "원룸",
    size: "18㎡",
    deposit: "1,000만원",
    monthly: "30만원",
    postedAt: "2023년 6월 8일",
    availableFrom: "2023년 7월 1일",
    description:
      "LH에서 제공하는 청년 매입임대주택입니다. 역삼역에서 도보 5분 거리에 위치하고 있으며, 주변에 편의시설이 잘 갖추어져 있습니다. 청년(만 19-39세)을 대상으로 하며, 소득 및 자산 기준을 충족해야 합니다.",
    features: ["풀옵션(냉장고, 세탁기, 에어컨, 인덕션 등)", "보안시설(도어락, CCTV)", "엘리베이터", "공용 주차장"],
    requirements: [
      "만 19-39세 청년",
      "무주택자",
      "소득 기준: 도시근로자 월평균 소득 100% 이하",
      "자산 기준: 총자산 2억 8,800만원 이하, 자동차 3,557만원 이하",
    ],
    tags: ["청년전용", "역세권", "즉시입주"],
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    nearbyJobs: [
      {
        id: 1,
        title: "웹 프론트엔드 개발자",
        company: "테크스타트",
        location: "서울 강남구",
        distance: "도보 15분",
        salary: "3,600만원",
      },
      {
        id: 2,
        title: "UI/UX 디자이너",
        company: "디자인허브",
        location: "서울 강남구",
        distance: "지하철 2정거장",
        salary: "3,200만원",
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
          <h1 className="text-lg font-semibold">주거 정보</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <Image src={housing.images[0] || "/placeholder.svg"} alt={housing.title} fill className="object-cover" />
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold">{housing.title}</h2>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{housing.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Home className="h-4 w-4 mr-1" />
              <span>
                {housing.type} · {housing.size}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {housing.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">보증금</div>
                <div className="font-semibold text-blue-600">{housing.deposit}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">월세</div>
                <div className="font-semibold text-blue-600">{housing.monthly}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">등록일</div>
                <div className="font-semibold">{housing.postedAt}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">입주가능일</div>
                <div className="font-semibold">{housing.availableFrom}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">상세 설명</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{housing.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">시설 및 특징</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                {housing.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">입주 자격</h3>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                {housing.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">사진</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {housing.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${housing.title} 이미지 ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center mb-3">
            <Briefcase className="h-5 w-5 mr-2" />
            인근 일자리
          </h3>

          <div className="space-y-3">
            {housing.nearbyJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{job.title}</h4>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {job.company} · {job.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-500">주거지에서 {job.distance}</div>
                    <div className="font-medium text-blue-600">{job.salary}</div>
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
          <Button className="flex-1">신청하기</Button>
        </div>
      </main>
    </div>
  )
}
