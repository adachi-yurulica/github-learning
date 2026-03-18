import { useState } from 'react'
import type { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useProgress } from '../../hooks/useProgress'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { progress, totalProgress } = useProgress()

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header
        totalProgress={totalProgress}
        onMenuToggle={() => setMenuOpen(o => !o)}
        menuOpen={menuOpen}
      />
      <div className="flex">
        <Sidebar
          completedChapters={progress.completedChapters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
