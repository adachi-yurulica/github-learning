import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CommandCard } from '../components/chapter/CommandCard'
import { QuizCard } from '../components/chapter/QuizCard'
import { useProgress } from '../hooks/useProgress'
import { COMMANDS } from '../data/commands'

export function Chapter3() {
  const navigate = useNavigate()
  const { completeChapter, isChapterCompleted } = useProgress()
  const isDone = isChapterCompleted(3)

  const handleComplete = () => {
    completeChapter(3)
    navigate('/chapter/4')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Chapter header */}
      <div className="mb-8">
        <div className="text-github-muted text-sm mb-2">Chapter 3</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">⌨️</span>
          基本操作マスター
        </h1>
        <p className="text-github-muted mt-2">
          8つの基本コマンドをカード形式でマスターしよう
        </p>
      </div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-github-surface border border-github-border rounded-xl p-4 mb-6 text-sm text-github-muted"
      >
        <span className="text-github-text font-semibold">💡 このチャプターについて</span>
        <p className="mt-1">
          Gitの基本的なコマンドを8つ紹介します。最初は全部覚えなくてもOK！
          「こんなコマンドがあるんだ」という感覚で読んでみましょう。
        </p>
      </motion.div>

      {/* Command cards */}
      {COMMANDS.map((command, idx) => (
        <CommandCard key={command.command} command={command} delay={0.1 * idx} />
      ))}

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <QuizCard
          question="ファイルを変更した後、Gitにセーブする正しい順番はどれですか？"
          options={[
            { text: 'git commit → git add → git push', correct: false },
            { text: 'git push → git add → git commit', correct: false },
            { text: 'git add → git commit → git push', correct: true },
            { text: 'git status → git push → git commit', correct: false },
          ]}
          explanation="正しい順番は: git add（ステージング）→ git commit（ローカルに記録）→ git push（GitHubにアップロード）です。この3ステップが基本の流れです！"
        />
      </motion.div>

      {/* Complete button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        {isDone ? (
          <button
            onClick={() => navigate('/chapter/4')}
            className="bg-github-surface border border-github-border text-github-text font-semibold px-8 py-3 rounded-lg hover:bg-github-darker transition-colors"
          >
            Chapter 4へ進む →
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="bg-github-accent hover:bg-github-accentHover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ✅ Chapter 3 完了！Chapter 4へ進む →
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
