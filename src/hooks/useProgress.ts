import { useState, useCallback, useEffect } from 'react'
import type { Progress } from '../types'
import { BADGES } from '../data/chapters'

const STORAGE_KEY = 'github-learning-progress'

const defaultProgress: Progress = {
  completedChapters: [],
  completedExercises: [],
  earnedBadges: [],
}

function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as Progress
    }
  } catch {
    // ignore
  }
  return defaultProgress
}

function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}

/** バッジ獲得条件を計算する（Chapter は 1〜5 の計5つ） */
function computeBadges(progress: Progress): string[] {
  const badges: string[] = []
  for (const badge of BADGES) {
    if (badge.requiredChapter === 'all') {
      // 全5チャプター完了でバッジ獲得
      if (progress.completedChapters.length >= 5) {
        badges.push(badge.id)
      }
    } else {
      if (progress.completedChapters.includes(badge.requiredChapter)) {
        badges.push(badge.id)
      }
    }
  }
  return badges
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeChapter = useCallback((chapterId: number) => {
    setProgress(prev => {
      if (prev.completedChapters.includes(chapterId)) return prev
      const updated = {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
      }
      updated.earnedBadges = computeBadges(updated)
      return updated
    })
  }, [])

  const completeExercise = useCallback((exerciseId: string) => {
    setProgress(prev => {
      if (prev.completedExercises.includes(exerciseId)) return prev
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
  }, [])

  const isChapterCompleted = useCallback(
    (chapterId: number) => progress.completedChapters.includes(chapterId),
    [progress.completedChapters]
  )

  const isExerciseCompleted = useCallback(
    (exerciseId: string) => progress.completedExercises.includes(exerciseId),
    [progress.completedExercises]
  )

  // 全 5 チャプターに対する進捗率
  const totalProgress = Math.round(
    (progress.completedChapters.length / 5) * 100
  )

  return {
    progress,
    completeChapter,
    completeExercise,
    resetProgress,
    isChapterCompleted,
    isExerciseCompleted,
    totalProgress,
  }
}
