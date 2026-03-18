import type { ChapterInfo, Badge } from '../types'

export const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    title: 'Gitとは？',
    emoji: '📦',
    description: 'Gitの基本概念をゲームのセーブポイントで学ぼう',
    path: '/chapter/1',
  },
  {
    id: 2,
    title: 'GitHubとは？',
    emoji: '🐙',
    description: 'GitHubをGoogle Driveと比較しながら理解しよう',
    path: '/chapter/2',
  },
  {
    id: 3,
    title: '基本操作マスター',
    emoji: '⌨️',
    description: '8つの基本コマンドをカード形式でマスター',
    path: '/chapter/3',
  },
  {
    id: 4,
    title: 'ハンズオン',
    emoji: '🚀',
    description: 'ターミナルシミュレーターで実際に手を動かそう',
    path: '/chapter/4',
  },
]

export const BADGES: Badge[] = [
  {
    id: 'git-debut',
    emoji: '🌱',
    name: 'Gitデビュー',
    description: 'Chapter 1 完了',
    requiredChapter: 1,
  },
  {
    id: 'github-debut',
    emoji: '🐙',
    name: 'GitHubデビュー',
    description: 'Chapter 2 完了',
    requiredChapter: 2,
  },
  {
    id: 'command-master',
    emoji: '⌨️',
    name: 'コマンドマスター',
    description: 'Chapter 3 完了',
    requiredChapter: 3,
  },
  {
    id: 'handson-complete',
    emoji: '🚀',
    name: 'ハンズオン完走',
    description: 'Chapter 4 完了',
    requiredChapter: 4,
  },
  {
    id: 'github-graduate',
    emoji: '🎓',
    name: 'GitHub卒業生',
    description: '全チャプター完了',
    requiredChapter: 'all',
  },
]
