import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionCardProps {
  title: string
  emoji?: string
  children: ReactNode
  delay?: number
}

export function SectionCard({ title, emoji, children, delay = 0 }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-github-surface border border-github-border rounded-xl p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-github-text mb-4 flex items-center gap-2">
        {emoji && <span className="text-2xl">{emoji}</span>}
        {title}
      </h2>
      <div className="text-github-text leading-relaxed">{children}</div>
    </motion.div>
  )
}
