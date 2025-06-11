"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container px-4 py-4">
          <h1 className="text-xl font-bold text-blue-600 text-center">청년 내:일집</h1>
          <div className="mt-4">
            <Progress value={(step / totalSteps) * 100} className="h-2" />
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>기본 정보</span>
              <span>일자리 선호</span>
              <span>주거 선호</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="이름을 입력하세요" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age">나이</Label>
                <Input id="age" type="number" placeholder="나이를 입력하세요" />
              </div>

              <div className="grid gap-2">
                <Label>성별</Label>
                <RadioGroup defaultValue="male">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">여성</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">현재 거주지</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">서울특별시</SelectItem>
                    <SelectItem value="gyeonggi">경기도</SelectItem>
                    <SelectItem value="incheon">인천광역시</SelectItem>
                    <SelectItem value="busan">부산광역시</SelectItem>
                    <SelectItem value="other">기타 지역</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={nextStep} className="w-full">
                다음
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>일자리 선호</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="job-type">희망 직종</Label>
                <Select>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="직종을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT/개발</SelectItem>
                    <SelectItem value="design">디자인</SelectItem>
                    <SelectItem value="marketing">마케팅/광고</SelectItem>
                    <SelectItem value="finance">금융/회계</SelectItem>
                    <SelectItem value="service">서비스업</SelectItem>
                    <SelectItem value="education">교육</SelectItem>
                    <SelectItem value="manufacturing">제조/생산</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="job-location">희망 근무지</Label>
                <Select>
                  <SelectTrigger id="job-location">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul-gangnam">서울 강남/서초</SelectItem>
                    <SelectItem value="seoul-mapo">서울 마포/영등포</SelectItem>
                    <SelectItem value="seoul-jongno">서울 종로/중구</SelectItem>
                    <SelectItem value="gyeonggi">경기도</SelectItem>
                    <SelectItem value="incheon">인천</SelectItem>
                    <SelectItem value="anywhere">지역 무관</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label>희망 연봉</Label>
                  <span className="text-sm text-gray-500">3,500만원</span>
                </div>
                <Slider defaultValue={[35]} max={100} step={1} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>2,000만원</span>
                  <span>5,000만원+</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>고용 형태</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fulltime" />
                    <Label htmlFor="fulltime" className="text-sm">
                      정규직
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract" />
                    <Label htmlFor="contract" className="text-sm">
                      계약직
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="intern" />
                    <Label htmlFor="intern" className="text-sm">
                      인턴/수습
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                이전
              </Button>
              <Button onClick={nextStep}>다음</Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>주거 선호</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="housing-type">희망 주택 유형</Label>
                <Select>
                  <SelectTrigger id="housing-type">
                    <SelectValue placeholder="주택 유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oneroom">원룸</SelectItem>
                    <SelectItem value="tworoom">투룸</SelectItem>
                    <SelectItem value="officetel">오피스텔</SelectItem>
                    <SelectItem value="apartment">아파트</SelectItem>
                    <SelectItem value="share">셰어하우스</SelectItem>
                    <SelectItem value="any">상관없음</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="housing-location">희망 거주지</Label>
                <Select>
                  <SelectTrigger id="housing-location">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul-all">서울 전역</SelectItem>
                    <SelectItem value="seoul-gangnam">서울 강남/서초</SelectItem>
                    <SelectItem value="seoul-mapo">서울 마포/영등포</SelectItem>
                    <SelectItem value="gyeonggi">경기도</SelectItem>
                    <SelectItem value="incheon">인천</SelectItem>
                    <SelectItem value="workplace-nearby">직장 근처</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label>희망 월세</Label>
                  <span className="text-sm text-gray-500">40만원</span>
                </div>
                <Slider defaultValue={[40]} max={100} step={5} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>20만원</span>
                  <span>100만원+</span>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label>희망 보증금</Label>
                  <span className="text-sm text-gray-500">1,000만원</span>
                </div>
                <Slider defaultValue={[10]} max={50} step={1} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>500만원</span>
                  <span>5,000만원+</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>주거 지원 프로그램</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="lh" />
                    <Label htmlFor="lh" className="text-sm">
                      LH 청년 매입임대
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sh" />
                    <Label htmlFor="sh" className="text-sm">
                      SH 행복주택
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="empty-house" />
                    <Label htmlFor="empty-house" className="text-sm">
                      빈집 리모델링
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="private" />
                    <Label htmlFor="private" className="text-sm">
                      일반 임대
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                이전
              </Button>
              <Button className="flex-1 ml-2">시작하기</Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}
