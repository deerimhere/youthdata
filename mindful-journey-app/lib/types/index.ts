import type React from "react"
export interface Emotion {
  id: string
  label: string
  icon: React.ElementType
  feedback: string
  color?: string // For graph or UI elements
}

export interface JobSuggestion {
  id: string
  title: string
  description: string
  dailyRoutine: string
  relatedInterest: string
}

export interface Interest {
  id: string
  name: string
  icon: React.ElementType
}

export interface LearningMission {
  id: string
  title: string
  description: string
  reward: string
  duration: string
  type: "video" | "tutorial" | "article"
  link?: string
  abilityRewards: { [abilityName: string]: number }
}

// 새로 추가된 커리큘럼 관련 타입들
export interface CurriculumStep {
  id: string
  title: string
  description: string
  missions: LearningMission[]
  estimatedDuration: string
  difficulty: "초급" | "중급" | "고급"
  prerequisites?: string[]
}

export interface JobCurriculum {
  jobId: string
  jobTitle: string
  description: string
  totalDuration: string
  difficulty: "초급" | "중급" | "고급"
  steps: CurriculumStep[]
  requiredAbilities: { [abilityName: string]: number }
}

export interface Resource {
  id: string
  category: "주거" | "일자리" | "제도"
  title: string
  description: string
  details?: string
  link?: string
}

export interface EmotionLog {
  date: string
  emotionId: string
  intensity?: number
}

export interface LearningHistoryItem {
  date: string
  missionTitle: string
  status: "완료" | "진행중"
}

export interface ExplorationHistoryItem {
  date: string
  interest: string
  viewedJobs?: string[]
}
