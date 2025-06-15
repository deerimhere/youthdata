import type { InitialQuestion, CategoryQuestion, JobMapping } from "@/lib/types/survey"

// CSV 파싱 함수
function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

  return lines.slice(1).map((line) => {
    const values = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    const obj: any = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] || ""
    })
    return obj
  })
}

// 데이터 로딩 함수들
export async function loadInitialQuestions(): Promise<InitialQuestion[]> {
  try {
    const response = await fetch("/data/initial-questions.csv")
    const csvText = await response.text()
    return parseCSV(csvText) as InitialQuestion[]
  } catch (error) {
    console.error("Failed to load initial questions:", error)
    return []
  }
}

export async function loadCategoryQuestions(): Promise<CategoryQuestion[]> {
  try {
    const response = await fetch("/data/category-questions.csv")
    const csvText = await response.text()
    return parseCSV(csvText) as CategoryQuestion[]
  } catch (error) {
    console.error("Failed to load category questions:", error)
    return []
  }
}

export async function loadJobMappings(): Promise<JobMapping[]> {
  try {
    const response = await fetch("/data/job-mapping.csv")
    const csvText = await response.text()
    return parseCSV(csvText) as JobMapping[]
  } catch (error) {
    console.error("Failed to load job mappings:", error)
    return []
  }
}

// 결과 계산 함수들
export function calculatePrimaryCategory(answers: { [key: string]: boolean }, questions: InitialQuestion[]): string {
  const categoryScores: { [key: string]: number } = {}

  questions.forEach((question) => {
    if (answers[question.QID] === true) {
      categoryScores[question.Category1] = (categoryScores[question.Category1] || 0) + 1
    }
  })

  let maxScore = 0
  let primaryCategory = ""

  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score > maxScore) {
      maxScore = score
      primaryCategory = category
    }
  })

  return primaryCategory
}

export function calculateSecondaryCategories(
  answers: { [key: string]: boolean },
  questions: CategoryQuestion[],
): string[] {
  const selectedCategories: string[] = []

  questions.forEach((question) => {
    if (answers[question.Category2] === true) {
      selectedCategories.push(question.Category2)
    }
  })

  return selectedCategories
}

export function getRecommendedJobs(
  primaryCategory: string,
  secondaryCategories: string[],
  jobMappings: JobMapping[],
): string[] {
  const jobs: string[] = []

  jobMappings.forEach((mapping) => {
    if (mapping.Category1 === primaryCategory && secondaryCategories.includes(mapping.Category2)) {
      jobs.push(mapping.KNOW직업명)
    }
  })

  return [...new Set(jobs)] // 중복 제거
}
