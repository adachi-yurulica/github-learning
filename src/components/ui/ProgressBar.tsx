import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  label?: string
  showPercent?: boolean
  color?: string
}

export function ProgressBar({
  value,
  label,
  showPercent = true,
  color = 'bg-github-accent',
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-github-muted">{label}</span>}
          {showPercent && (
            <span className="text-xs text-github-muted ml-auto">{value}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-github-darker rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-2 rounded-full ${color}`}
        />
      </div>
    </div>
  )
}
