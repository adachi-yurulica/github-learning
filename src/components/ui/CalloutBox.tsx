import type { ReactNode } from 'react'

type CalloutType = 'info' | 'tip' | 'warning' | 'success'

interface CalloutBoxProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const styles: Record<CalloutType, { border: string; bg: string; icon: string; titleColor: string }> = {
  info: {
    border: 'border-github-blue',
    bg: 'bg-github-blue/10',
    icon: 'ℹ️',
    titleColor: 'text-github-blue',
  },
  tip: {
    border: 'border-github-accent',
    bg: 'bg-github-accent/10',
    icon: '💡',
    titleColor: 'text-github-accent',
  },
  warning: {
    border: 'border-github-yellow',
    bg: 'bg-github-yellow/10',
    icon: '⚠️',
    titleColor: 'text-github-yellow',
  },
  success: {
    border: 'border-github-accent',
    bg: 'bg-github-accent/10',
    icon: '✅',
    titleColor: 'text-github-accent',
  },
}

export function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const s = styles[type]
  return (
    <div className={`border-l-4 ${s.border} ${s.bg} px-4 py-3 rounded-r-lg my-4`}>
      <div className={`font-semibold ${s.titleColor} mb-1`}>
        <span className="mr-2">{s.icon}</span>
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="text-github-text text-sm leading-relaxed">{children}</div>
    </div>
  )
}
