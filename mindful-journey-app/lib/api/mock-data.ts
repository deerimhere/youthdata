import type React from "react"
import type {
  Emotion,
  JobSuggestion,
  Interest,
  LearningMission,
  JobCurriculum,
  Resource,
  EmotionLog,
  LearningHistoryItem,
  ExplorationHistoryItem,
} from "@/lib/types"
import {
  Smile,
  Meh,
  Frown,
  Angry,
  SmilePlus,
  Palette,
  Music,
  Users,
  Coffee,
  HelpCircle,
  PlayCircle,
  BookText,
  Brain,
  HomeIcon,
  Briefcase,
  Award,
} from "lucide-react"

export const emotions: Emotion[] = [
  {
    id: "happy",
    label: "행복해요",
    icon: Smile,
    feedback: "오늘 정말 좋은 일이 있었나봐요! 그 기분, 마음껏 누리세요. 😊",
    color: "text-green-500",
  },
  {
    id: "neutral",
    label: "그냥 그래요",
    icon: Meh,
    feedback: "괜찮아요. 모든 날이 특별할 필요는 없으니까요. 잠시 숨을 고르며 오늘 하루를 돌아보는 건 어때요? 😐",
    color: "text-yellow-500",
  },
  {
    id: "sad",
    label: "슬퍼요",
    icon: Frown,
    feedback: "오늘은 마음이 조금 무거웠군요. 그래도 여기까지 온 당신, 정말 잘했어요. 당신의 감정을 존중해요. 🫂",
    color: "text-blue-500",
  },
  {
    id: "angry",
    label: "화나요",
    icon: Angry,
    feedback:
      "화가 나는 일이 있었군요. 그 감정, 충분히 느낄 자격 있어요. 잠시 심호흡하고, 무엇이 당신을 힘들게 했는지 돌아봐도 좋아요. 😤",
    color: "text-red-500",
  },
  {
    id: "excited",
    label: "신나요!",
    icon: SmilePlus,
    feedback: "와, 정말 신나는 하루인가 봐요! 이 에너지를 즐겨보세요! ✨",
    color: "text-orange-500",
  },
]

export const interests: Interest[] = [
  { id: "design", name: "디자인", icon: Palette },
  { id: "music", name: "음악", icon: Music },
  { id: "people", name: "사람과 일", icon: Users },
  { id: "solo", name: "혼자 있는 것", icon: Coffee },
  { id: "unknown", name: "잘 모르겠어요", icon: HelpCircle },
]

export const jobSuggestions: JobSuggestion[] = [
  {
    id: "video_editor",
    title: "영상편집자",
    description: "혼자 작업하고, 디테일을 살리는 일에 익숙한 사람에게 좋아요.",
    dailyRoutine: "영상 촬영본 검토 → 컷 편집 및 자막 작업 → 효과 및 색 보정 �� 최종 검토 및 렌더링.",
    relatedInterest: "solo",
  },
  {
    id: "graphic_designer",
    title: "그래픽 디자이너",
    description: "시각적인 요소를 통해 메시지를 전달하는 창의적인 작업입니다.",
    dailyRoutine:
      "클라이언트 요구사항 분석 → 아이디어 스케치 및 시안 제작 → 디자인 작업 (로고, 포스터 등) → 피드백 반영 및 수정.",
    relatedInterest: "design",
  },
  {
    id: "sound_engineer",
    title: "음향 엔지니어",
    description: "음악 및 오디오 콘텐츠의 녹음, 믹싱, 마스터링을 담당합니다.",
    dailyRoutine: "녹음 세션 준비 → 악기 및 보컬 녹음 → 믹싱 (볼륨, 이펙트 조절) → 마스터링 (최종 음질 보정).",
    relatedInterest: "music",
  },
  {
    id: "social_worker",
    title: "사회복지사",
    description: "도움이 필요한 사람들을 지원하고 지역사회 문제 해결에 기여합니다.",
    dailyRoutine: "상담 및 사례 관리 → 프로그램 기획 및 운영 → 자원 연계 및 행정 업무.",
    relatedInterest: "people",
  },
  {
    id: "writer",
    title: "작가/콘텐츠 크리에이터",
    description: "글쓰기를 통해 정보, 감동, 재미를 전달합니다.",
    dailyRoutine: "아이디어 구상 및 자료 조사 → 초고 작성 → 퇴고 및 편집 → 발행 또는 제출.",
    relatedInterest: "solo",
  },
  {
    id: "ui_ux_designer",
    title: "UI/UX 디자이너",
    description: "사용자 중심의 편리하고 매력적인 디지털 제품 인터페이스를 설계합니다.",
    dailyRoutine: "사용자 리서치 → 와이어프레임 및 프로토타입 제작 → UI 디자인 → 사용성 테스트 및 개선.",
    relatedInterest: "design",
  },
]
export const getJobSuggestionsByInterest = (interestId: string): JobSuggestion[] => {
  if (interestId === "unknown") return jobSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
  const filtered = jobSuggestions.filter((job) => job.relatedInterest === interestId)
  return filtered.length > 0
    ? filtered.slice(0, Math.min(filtered.length, 3))
    : jobSuggestions.sort(() => 0.5 - Math.random()).slice(0, 3)
}

export const learningMissions: LearningMission[] = [
  {
    id: "video_editing_basics",
    title: "영상편집 기초 다지기",
    description: "영상편집의 기본 개념과 용어를 배우고, 간단한 컷 편집을 연습해봐요.",
    reward: "경험치 +15, 집중력 +3, 창의성 +2",
    duration: "15분",
    type: "video",
    link: "https://www.youtube.com/results?search_query=영상편집+기초",
    abilityRewards: { 집중력: 3, 창의성: 2 },
  },
  {
    id: "video_editing_advanced",
    title: "고급 영상편집 기법",
    description: "컬러 그레이딩, 모션 그래픽 등 전문적인 편집 기법을 배워봅시다.",
    reward: "경험치 +25, 집중력 +4, 창의성 +5",
    duration: "30분",
    type: "tutorial",
    abilityRewards: { 집중력: 4, 창의성: 5 },
  },
  {
    id: "design_fundamentals",
    title: "디자인 기초 원리",
    description: "색상, 타이포그래피, 레이아웃 등 디자인의 기본 원리를 학습합니다.",
    reward: "경험치 +20, 창의성 +4, 공부 +2",
    duration: "25분",
    type: "article",
    abilityRewards: { 창의성: 4, 공부: 2 },
  },
  {
    id: "adobe_photoshop",
    title: "포토샵 기초 마스터",
    description: "포토샵의 기본 도구와 기능을 익혀 간단한 편집 작업을 할 수 있게 됩니다.",
    reward: "경험치 +30, 창의성 +5, 집중력 +3",
    duration: "40분",
    type: "tutorial",
    abilityRewards: { 창의성: 5, 집중력: 3 },
  },
  {
    id: "coding_intro_python",
    title: "파이썬 코딩 첫걸음",
    description: "파이썬의 기본 문법을 익히고, 간단한 프로그램을 작성해봅시다.",
    reward: "경험치 +20, 공부 +4, 집중력 +2",
    duration: "20분",
    type: "tutorial",
    link: "https://www.codecademy.com/learn/learn-python-3",
    abilityRewards: { 공부: 4, 집중력: 2 },
  },
  {
    id: "mindfulness_meditation",
    title: "마음챙김 명상 연습",
    description: "오늘 하루, 10분간 명상을 통해 마음의 평화를 찾아보세요.",
    reward: "안정감 +10, 집중력 +3, 소통 +2",
    duration: "10분",
    type: "article",
    link: "https://www.mindful.org/how-to-meditate/",
    abilityRewards: { 집중력: 3, 소통: 2 },
  },
  {
    id: "team_communication",
    title: "팀 소통 스킬 향상",
    description: "효과적인 팀 커뮤니케이션 방법을 배우고 실습해봅시다.",
    reward: "경험치 +18, 소통 +5, 리더십 +3",
    duration: "25분",
    type: "tutorial",
    abilityRewards: { 소통: 5, 리더십: 3 },
  },
  {
    id: "creative_thinking",
    title: "창의적 사고 훈련",
    description: "다양한 관점에서 문제를 바라보는 창의적 사고법을 익혀봅시다.",
    reward: "경험치 +22, 창의성 +4, 공부 +2",
    duration: "30분",
    type: "article",
    abilityRewards: { 창의성: 4, 공부: 2 },
  },
  {
    id: "fitness_basics",
    title: "기초 체력 만들기",
    description: "집에서 할 수 있는 간단한 운동으로 기초 체력을 길러봅시다.",
    reward: "경험치 +15, 운동 +5, 집중력 +1",
    duration: "20분",
    type: "video",
    abilityRewards: { 운동: 5, 집중력: 1 },
  },
  {
    id: "music_theory_basics",
    title: "음악 이론 기초",
    description: "음계, 화음, 리듬 등 음악의 기본 이론을 배워봅시다.",
    reward: "경험치 +18, 창의성 +3, 공부 +3",
    duration: "22분",
    type: "tutorial",
    abilityRewards: { 창의성: 3, 공부: 3 },
  },
  {
    id: "audio_mixing",
    title: "오디오 믹싱 입문",
    description: "DAW를 사용한 기본적인 오디오 믹싱 기법을 익혀봅시다.",
    reward: "경험치 +25, 창의성 +4, 집중력 +4",
    duration: "35분",
    type: "tutorial",
    abilityRewards: { 창의성: 4, 집중력: 4 },
  },
]

// 직업별 커리큘럼 데이터
export const jobCurriculums: JobCurriculum[] = [
  {
    jobId: "video_editor",
    jobTitle: "영상편집자",
    description: "영상편집의 기초부터 고급 기법까지, 전문 영상편집자가 되기 위한 완전한 로드맵입니다.",
    totalDuration: "8-12주",
    difficulty: "중급",
    requiredAbilities: { 집중력: 80, 창의성: 75 },
    steps: [
      {
        id: "step1",
        title: "1단계: 영상편집 기초",
        description: "영상편집의 기본 개념과 도구 사용법을 익힙니다.",
        estimatedDuration: "2-3주",
        difficulty: "초급",
        missions: [
          learningMissions.find((m) => m.id === "video_editing_basics")!,
          learningMissions.find((m) => m.id === "mindfulness_meditation")!,
        ],
      },
      {
        id: "step2",
        title: "2단계: 고급 편집 기법",
        description: "전문적인 편집 기법과 효과를 배웁니다.",
        estimatedDuration: "3-4주",
        difficulty: "중급",
        prerequisites: ["step1"],
        missions: [
          learningMissions.find((m) => m.id === "video_editing_advanced")!,
          learningMissions.find((m) => m.id === "creative_thinking")!,
        ],
      },
      {
        id: "step3",
        title: "3단계: 포트폴리오 제작",
        description: "실제 프로젝트를 통해 포트폴리오를 구성합니다.",
        estimatedDuration: "3-5주",
        difficulty: "고급",
        prerequisites: ["step2"],
        missions: [learningMissions.find((m) => m.id === "team_communication")!],
      },
    ],
  },
  {
    jobId: "graphic_designer",
    jobTitle: "그래픽 디자이너",
    description: "시각 디자인의 기초부터 실무까지, 전문 그래픽 디자이너로 성장하는 커리큘럼입니다.",
    totalDuration: "10-14주",
    difficulty: "중급",
    requiredAbilities: { 창의성: 85, 집중력: 70 },
    steps: [
      {
        id: "step1",
        title: "1단계: 디자인 기초 이론",
        description: "디자인의 기본 원리와 이론을 학습합니다.",
        estimatedDuration: "3-4주",
        difficulty: "초급",
        missions: [
          learningMissions.find((m) => m.id === "design_fundamentals")!,
          learningMissions.find((m) => m.id === "creative_thinking")!,
        ],
      },
      {
        id: "step2",
        title: "2단계: 디자인 도구 마스터",
        description: "포토샵, 일러스트레이터 등 전문 도구를 익힙니다.",
        estimatedDuration: "4-5주",
        difficulty: "중급",
        prerequisites: ["step1"],
        missions: [
          learningMissions.find((m) => m.id === "adobe_photoshop")!,
          learningMissions.find((m) => m.id === "mindfulness_meditation")!,
        ],
      },
      {
        id: "step3",
        title: "3단계: 실무 프로젝트",
        description: "실제 클라이언트 작업을 통해 실무 경험을 쌓습니다.",
        estimatedDuration: "3-5주",
        difficulty: "고급",
        prerequisites: ["step2"],
        missions: [learningMissions.find((m) => m.id === "team_communication")!],
      },
    ],
  },
  {
    jobId: "sound_engineer",
    jobTitle: "음향 엔지니어",
    description: "음향 기술의 기초부터 전문 엔지니어링까지, 음향 분야의 전문가가 되는 과정입니다.",
    totalDuration: "12-16주",
    difficulty: "고급",
    requiredAbilities: { 창의성: 80, 집중력: 85, 공부: 75 },
    steps: [
      {
        id: "step1",
        title: "1단계: 음향 기초 이론",
        description: "음향학의 기본 원리와 음악 이론을 학습합니다.",
        estimatedDuration: "4-5주",
        difficulty: "초급",
        missions: [
          learningMissions.find((m) => m.id === "music_theory_basics")!,
          learningMissions.find((m) => m.id === "mindfulness_meditation")!,
        ],
      },
      {
        id: "step2",
        title: "2단계: 오디오 믹싱 & 마스터링",
        description: "전문적인 오디오 처리 기법을 익힙니다.",
        estimatedDuration: "4-6주",
        difficulty: "중급",
        prerequisites: ["step1"],
        missions: [
          learningMissions.find((m) => m.id === "audio_mixing")!,
          learningMissions.find((m) => m.id === "creative_thinking")!,
        ],
      },
      {
        id: "step3",
        title: "3단계: 스튜디오 실무",
        description: "실제 스튜디오 환경에서의 작업 경험을 쌓습니다.",
        estimatedDuration: "4-5주",
        difficulty: "고급",
        prerequisites: ["step2"],
        missions: [learningMissions.find((m) => m.id === "team_communication")!],
      },
    ],
  },
]

export const getTodaysMission = (): LearningMission =>
  learningMissions[Math.floor(Math.random() * learningMissions.length)]

export const getJobCurriculum = (jobId: string): JobCurriculum | undefined => {
  return jobCurriculums.find((curriculum) => curriculum.jobId === jobId)
}

export const missionIcons: { [key in LearningMission["type"]]: React.ElementType } = {
  video: PlayCircle,
  tutorial: BookText,
  article: Brain,
}

export const resources: Resource[] = [
  {
    id: "housing_1",
    category: "주거",
    title: "서울시 청년매입임대주택",
    description: "서울시에서 청년들의 주거 안정을 위해 제공하는 저렴한 임대주택입니다.",
    details: "월 15만원 (평균), 보증금 없음 또는 매우 낮음",
    link: "https://soco.seoul.go.kr/youth/main/main.do",
  },
  {
    id: "job_1",
    category: "일자리",
    title: "OO영상 편집 스튜디오 보조",
    description: "영상 편집 스튜디오에서 보조 업무를 하며 실무 경험을 쌓을 수 있는 기회입니다.",
    details: "주 3일, 시간 선택 가능, 경력 무관",
  },
  {
    id: "support_1",
    category: "제도",
    title: "청년 자기계발 지원금",
    description: "미취업 청년의 구직활동 및 역량 강화를 위한 지원금입니다.",
    details: "월 20만원 (최대 6개월), 신청 조건 확인 필요",
    link: "https://www.youthcenter.go.kr/",
  },
]
export const getRelevantResources = (): Resource[] => resources.sort(() => 0.5 - Math.random()).slice(0, 3)
export const resourceCategoryIcons: { [key in Resource["category"]]: React.ElementType } = {
  주거: HomeIcon,
  일자리: Briefcase,
  제도: Award,
}

export const mockEmotionLogs: EmotionLog[] = [
  { date: "2025-06-10", emotionId: "happy", intensity: 5 },
  { date: "2025-06-11", emotionId: "neutral", intensity: 3 },
  { date: "2025-06-12", emotionId: "sad", intensity: 2 },
  { date: "2025-06-13", emotionId: "excited", intensity: 4 },
  { date: "2025-06-14", emotionId: "happy", intensity: 5 },
  { date: "2025-06-15", emotionId: "neutral", intensity: 3 },
  { date: "2025-06-09", emotionId: "angry", intensity: 4 },
]
export const mockLearningHistory: LearningHistoryItem[] = [
  { date: "2025-06-10", missionTitle: "영상편집 기초 다지기", status: "완료" },
  { date: "2025-06-12", missionTitle: "파이썬 코딩 첫걸음", status: "완료" },
]
export const mockExplorationHistory: ExplorationHistoryItem[] = [
  { date: "2025-06-11", interest: "혼자 있는 것", viewedJobs: ["영상편집자", "작가"] },
  { date: "2025-06-13", interest: "디자인", viewedJobs: ["그래픽 디자이너"] },
]
export const getTodaysDiarySummary = (): string => {
  const summaries = [
    "오늘은 대체로 긍정적인 감정을 느꼈으며, 새로운 것을 배우는 데 집중했습니다.",
    "약간의 스트레스가 있었지만, 저녁에는 편안함을 느꼈습니다. 내일은 더 나은 하루가 되길 바랍니다.",
    "새로운 관심사를 탐색하며 즐거운 시간을 보냈습니다. 앞으로 더 많은 것을 알아가고 싶습니다.",
  ]
  return summaries[Math.floor(Math.random() * summaries.length)]
}
