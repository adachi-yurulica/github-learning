import { motion } from 'framer-motion'
import type { CommandData } from '../../data/commands'
import { CodeBlock } from '../ui/CodeBlock'

interface CommandCardProps {
  command: CommandData
  delay?: number
}

export function CommandCard({ command, delay = 0 }: CommandCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      className="bg-github-surface border border-github-border rounded-xl p-6 mb-4"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl">{command.emoji}</span>
        <div>
          <code className="text-github-yellow font-mono text-xl font-bold">
            {command.command}
          </code>
          <p className="text-github-muted text-sm mt-0.5">{command.meaning}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-github-text text-sm leading-relaxed mb-4">
        {command.description}
      </p>

      {/* Usage */}
      <div className="mb-4">
        <p className="text-xs text-github-muted mb-1 font-semibold uppercase tracking-wide">
          ✅ 使い方
        </p>
        <CodeBlock code={command.usage} language="bash" />
      </div>

      {/* NG Example */}
      <div className="border border-github-red/30 bg-github-red/5 rounded-lg p-3">
        <p className="text-xs text-github-red font-semibold mb-1">
          ❌ NG例・よくある間違い
        </p>
        <code className="text-github-muted font-mono text-sm">{command.ngExample}</code>
        <p className="text-github-muted text-xs mt-1">{command.ngReason}</p>
      </div>
    </motion.div>
  )
}
