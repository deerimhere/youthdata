import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, TrendingUp } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

      <div className="relative container px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            청년의 꿈을 위한
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              완벽한 시작
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            일자리와 주거를 한 번에! AI가 추천하는 맞춤형 매칭으로 새로운 인생을 시작하세요.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="지역, 직종, 주거 유형 검색..."
                className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 rounded-2xl px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              맞춤 추천 받기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-4 text-lg font-semibold"
            >
              <MapPin className="w-5 h-5 mr-2" />
              지역별 탐색
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-12 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">만족도</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">2,103</div>
              <div className="text-sm">매칭 성공</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">15분</div>
              <div className="text-sm">평균 매칭 시간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
