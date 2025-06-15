export interface InitialQuestion {
  QID: string
  Question1: string
  Category1: string
}

export interface CategoryQuestion {
  Category2: string
  Category1: string
  Question2: string
}

export interface JobMapping {
  Category1: string
  Category2: string
  KNOW직업명: string
}

export interface SurveyAnswer {
  questionId: string
  answer: boolean
}

export interface SurveyResult {
  primaryCategory: string
  secondaryCategories: string[]
  recommendedJobs: string[]
}
