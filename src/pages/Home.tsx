import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Circle } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { CHAPTERS } from '../data/chapters'

export function Home() {
  const { isChapterCompleted, totalProgress } = useProgress()
  const hasProgress = totalProgress > 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 mb-12"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-4"
        >
          🐙
        </motion.div>
        <h1 className="text-4xl font-bold text-github-text mb-4">
          社内 GitHub 学習
        </h1>
        <p className="text-github-muted text-xl mb-2">
          エンジニアじゃなくても大丈夫！
        </p>
        <p className="text-github-muted text-lg mb-8">
          ゲーム感覚で GitHubをマスターしよう 🚀
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/chapter/1"
            className="inline-flex items-center gap-2 bg-github-accent hover:bg-github-accentHover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            今すぐはじめる
            <ArrowRight size={18} />
          </Link>

          {hasProgress && (
            <Link
              to={`/chapter/${Math.min(5, Math.floor(totalProgress / 20) + 1)}`}
              className="inline-flex items-center gap-2 bg-github-surface hover:bg-github-border text-github-text font-semibold px-6 py-3 rounded-lg border border-github-border transition-colors"
            >
              続きから学ぶ
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </motion.div>

      {/* Chapter list */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-github-text mb-6 text-center">
          📚 学習コンテンツ
        </h2>
        <div className="grid gap-4">
          {CHAPTERS.map((chapter, idx) => {
            const done = isChapterCompleted(chapter.id)
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ x: 4 }}
              >
                <Link
                  to={chapter.path}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    done
                      ? 'border-github-accent bg-github-accent/5 hover:bg-github-accent/10'
                      : 'border-github-border bg-github-surface hover:border-github-blue hover:bg-github-darker'
                  }`}
                >
                  <span className="text-3xl">{chapter.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-github-text">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    {/* 対象者バッジ（Chapter 4/5 のみ） */}
                    {chapter.id === 4 && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                        👤 全員向け
                      </span>
                    )}
                    {chapter.id === 5 && (
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300">
                        🤖 エンジニア向け
                      </span>
                    )}
                    <p className="text-sm text-github-muted mt-0.5">
                      {chapter.description}
                    </p>
                  </div>
                  {done ? (
                    <div className="flex items-center gap-1.5 text-github-accent text-sm font-semibold">
                      <CheckCircle size={18} />
                      完了
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-github-muted text-sm">
                      <Circle size={18} />
                      未完了
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Who is this for */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-github-text mb-6 text-center">
          🎯 こんな人におすすめ
        </h2>
        <div className="bg-github-surface border border-github-border rounded-xl p-6">
          <ul className="space-y-3">
            {[
              '「Gitって何？」という方',
              'エンジニアと一緒に仕事をする方',
              'コードレビューに参加したい方',
              'GitHubでIssueを管理したい方',
              'プルリクエストをレビューしたい方',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx + 0.4 }}
                className="flex items-center gap-3 text-github-text"
              >
                <span className="text-github-accent font-bold">✅</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Stats */}
      {hasProgress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/progress"
            className="inline-flex items-center gap-2 text-github-blue hover:text-white transition-colors text-sm"
          >
            🏆 進捗・バッジを確認する →
          </Link>
        </motion.div>
      )}
    </div>
  )
}
