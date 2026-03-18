import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'
import { CHAPTERS } from '../../data/chapters'

interface SidebarProps {
  completedChapters: number[]
  open: boolean
  onClose: () => void
}

export function Sidebar({ completedChapters, open, onClose }: SidebarProps) {
  const location = useLocation()

  const content = (
    <div className="p-4 w-64">
      <p className="text-github-muted text-xs uppercase tracking-widest mb-4 font-semibold px-2">
        学習コンテンツ
      </p>
      <nav className="space-y-1">
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            location.pathname === '/'
              ? 'bg-github-accent/10 text-github-accent border border-github-accent/20'
              : 'text-github-muted hover:text-github-text hover:bg-github-darker'
          }`}
        >
          <span>🏠</span>
          <span>トップページ</span>
        </Link>

        {CHAPTERS.map(chapter => {
          const isActive = location.pathname === chapter.path
          const isDone = completedChapters.includes(chapter.id)

          return (
            <Link
              key={chapter.id}
              to={chapter.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-github-accent/10 text-github-accent border border-github-accent/20'
                  : 'text-github-muted hover:text-github-text hover:bg-github-darker'
              }`}
            >
              <span>{chapter.emoji}</span>
              <span className="flex-1">Chapter {chapter.id}: {chapter.title}</span>
              {isDone ? (
                <CheckCircle size={14} className="text-github-accent flex-shrink-0" />
              ) : (
                <Circle size={14} className="text-github-border flex-shrink-0" />
              )}
            </Link>
          )
        })}

        <Link
          to="/progress"
          onClick={onClose}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            location.pathname === '/progress'
              ? 'bg-github-accent/10 text-github-accent border border-github-accent/20'
              : 'text-github-muted hover:text-github-text hover:bg-github-darker'
          }`}
        >
          <span>🏆</span>
          <span>学習進捗</span>
        </Link>
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-r border-github-border bg-github-surface min-h-[calc(100vh-57px)] flex-shrink-0">
        {content}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 h-full bg-github-surface border-r border-github-border z-50 pt-14"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
