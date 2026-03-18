export interface ChapterInfo {
  id: number
  title: string
  emoji: string
  description: string
  path: string
}

export interface Badge {
  id: string
  emoji: string
  name: string
  description: string
  requiredChapter: number | 'all'
}

export interface Progress {
  completedChapters: number[]
  completedExercises: string[]
  earnedBadges: string[]
}
