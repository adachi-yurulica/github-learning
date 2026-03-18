import { Link } from 'react-router-dom'
import { Menu, X, BookOpen, BarChart3 } from 'lucide-react'
import { ProgressBar } from '../ui/ProgressBar'

interface HeaderProps {
  totalProgress: number
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ totalProgress, onMenuToggle, menuOpen }: HeaderProps) {
  return (
    <header className="bg-github-surface border-b border-github-border sticky top-0 z-50">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-github-muted hover:text-github-text transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-github-text hover:text-white transition-colors">
          <span className="text-2xl">🐙</span>
          <span className="hidden sm:block">GitHub Learning</span>
        </Link>

        {/* Progress bar (center) */}
        <div className="flex-1 max-w-xs mx-auto hidden sm:block">
          <ProgressBar value={totalProgress} showPercent={true} />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-2 ml-auto">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-github-muted hover:text-github-text transition-colors text-sm px-3 py-1.5 rounded-md hover:bg-github-darker"
          >
            <BookOpen size={16} />
            <span className="hidden md:block">学習</span>
          </Link>
          <Link
            to="/progress"
            className="flex items-center gap-1.5 text-github-muted hover:text-github-text transition-colors text-sm px-3 py-1.5 rounded-md hover:bg-github-darker"
          >
            <BarChart3 size={16} />
            <span className="hidden md:block">進捗</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
