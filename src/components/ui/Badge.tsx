import { motion } from 'framer-motion'
import type { Badge as BadgeType } from '../../types'

interface BadgeProps {
  badge: BadgeType
  earned?: boolean
}

export function Badge({ badge, earned = false }: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
        earned
          ? 'bg-github-surface border-github-accent shadow-lg shadow-github-accent/10'
          : 'bg-github-darker border-github-border opacity-40 grayscale'
      }`}
    >
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-github-accent text-white text-xs px-1.5 py-0.5 rounded-full"
        >
          ✓
        </motion.div>
      )}
      <span className="text-3xl mb-2">{badge.emoji}</span>
      <span className={`text-sm font-semibold ${earned ? 'text-github-text' : 'text-github-muted'}`}>
        {badge.name}
      </span>
      <span className="text-xs text-github-muted mt-1 text-center">{badge.description}</span>
    </motion.div>
  )
}
