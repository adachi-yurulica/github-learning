import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { BADGES, CHAPTERS } from '../data/chapters'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { CheckCircle, Circle } from 'lucide-react'

export function Progress() {
  const { progress, totalProgress, resetProgress } = useProgress()

  const handleReset = () => {
    if (window.confirm('学習進捗をリセットしますか？\n（バッジ・演習の完了状態もリセットされます）')) {
      resetProgress()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">🏆</span>
          学習進捗
        </h1>
        <p className="text-github-muted mt-2">
          これまでの学習成果を確認しよう
        </p>
      </div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-github-surface border border-github-border rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-github-text">全体の進捗</h2>
          <span className="text-2xl font-bold text-github-accent">{totalProgress}%</span>
        </div>
        <ProgressBar value={totalProgress} showPercent={false} />
        <p className="text-github-muted text-sm mt-2">
          {progress.completedChapters.length} / 4 チャプター完了
        </p>
      </motion.div>

      {/* Chapter status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-github-surface border border-github-border rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-github-text mb-4">チャプター別進捗</h2>
        <div className="space-y-3">
          {CHAPTERS.map(chapter => {
            const done = progress.completedChapters.includes(chapter.id)
            return (
              <div key={chapter.id} className="flex items-center gap-3">
                {done ? (
                  <CheckCircle size={18} className="text-github-accent flex-shrink-0" />
                ) : (
                  <Circle size={18} className="text-github-border flex-shrink-0" />
                )}
                <span className="text-xl">{chapter.emoji}</span>
                <span className={`flex-1 ${done ? 'text-github-text' : 'text-github-muted'}`}>
                  Chapter {chapter.id}: {chapter.title}
                </span>
                {done ? (
                  <span className="text-github-accent text-xs font-semibold bg-github-accent/10 px-2 py-0.5 rounded-full">
                    完了 ✅
                  </span>
                ) : (
                  <Link
                    to={chapter.path}
                    className="text-github-blue text-xs hover:underline"
                  >
                    学習する →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-github-surface border border-github-border rounded-xl p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-github-text mb-2">獲得バッジ</h2>
        <p className="text-github-muted text-sm mb-4">
          チャプターを完了するとバッジがもらえます！
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BADGES.map(badge => (
            <Badge
              key={badge.id}
              badge={badge}
              earned={progress.earnedBadges.includes(badge.id)}
            />
          ))}
        </div>
        <p className="text-github-muted text-xs mt-3">
          {progress.earnedBadges.length} / {BADGES.length} バッジ獲得
        </p>
      </motion.div>

      {/* All complete message */}
      {totalProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="bg-gradient-to-r from-github-accent/10 to-github-blue/10 border border-github-accent rounded-xl p-8 mb-6 text-center"
        >
          <div className="text-5xl mb-4">🎓🎉</div>
          <h2 className="text-2xl font-bold text-github-text mb-2">
            全チャプター完了おめでとう！
          </h2>
          <p className="text-github-muted">
            あなたはGitHubの基礎をすべてマスターしました！<br />
            これでエンジニアチームとの協力がよりスムーズになります。
          </p>
        </motion.div>
      )}

      {/* Reset button */}
      <div className="text-center">
        <button
          onClick={handleReset}
          className="text-github-muted hover:text-github-red text-sm transition-colors"
        >
          🔄 進捗をリセット
        </button>
      </div>
    </motion.div>
  )
}
