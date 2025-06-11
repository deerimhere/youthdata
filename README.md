# 청년 내:일집 - 청년 주거·일자리 매칭 앱

청년을 위한 일자리와 주거를 한 번에 매칭해주는 모바일 앱입니다.

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
\`\`\`bash
npm install
\`\`\`

2. **개발 서버 실행**
\`\`\`bash
npm run dev
\`\`\`

3. **브라우저에서 확인**
\`\`\`
http://localhost:3000
\`\`\`

## 📱 주요 기능

- **일자리 검색**: 워크넷 연계 채용정보
- **주거 지원**: LH, SH 공공임대 및 빈집 활용
- **맞춤 추천**: AI 기반 일자리-주거 매칭
- **모바일 최적화**: 터치 친화적 인터페이스

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Build**: Vercel

## 📂 프로젝트 구조

\`\`\`
├── app/                    # Next.js App Router
│   ├── page.tsx           # 홈페이지
│   ├── jobs/              # 일자리 페이지
│   ├── housing/           # 주거 페이지
│   └── profile/           # 프로필 페이지
├── components/            # 재사용 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/                  # 유틸리티 함수
└── public/               # 정적 파일
\`\`\`

## 🎨 디자인 시스템

- **색상**: 정부 블루 기반 신뢰감 있는 컬러 팔레트
- **타이포그래피**: 모바일 최적화된 폰트 크기
- **컴포넌트**: 일관된 디자인 시스템

## 📱 모바일 최적화

- 터치 친화적 인터페이스 (44px 최소 터치 영역)
- 하단 탭 네비게이션
- 스와이프 제스처 지원
- 안전 영역 고려

## 🚀 배포

### Vercel 배포
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### PWA 변환
\`\`\`bash
npm install next-pwa
\`\`\`

## 📄 라이선스

MIT License
