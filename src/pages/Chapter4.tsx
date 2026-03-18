import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Terminal } from '../components/terminal/Terminal'
import { EXERCISES } from '../components/terminal/commands'
import { useProgress } from '../hooks/useProgress'
import { CheckCircle, Circle } from 'lucide-react'

export function Chapter4() {
  const navigate = useNavigate()
  const { completeChapter, completeExercise, isChapterCompleted, isExerciseCompleted } = useProgress()
  const isDone = isChapterCompleted(4)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [exerciseKeys, setExerciseKeys] = useState<Record<number, number>>({})

  const exercise = EXERCISES[currentExercise]

  const handleExerciseSuccess = () => {
    completeExercise(exercise.id)
  }

  const handleComplete = () => {
    completeChapter(4)
    navigate('/progress')
  }

  const allExercisesDone = EXERCISES.every(ex => isExerciseCompleted(ex.id))

  const resetExercise = () => {
    setExerciseKeys(prev => ({
      ...prev,
      [currentExercise]: (prev[currentExercise] || 0) + 1,
    }))
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
        <div className="text-github-muted text-sm mb-2">Chapter 4</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          ハンズオン
        </h1>
        <p className="text-github-muted mt-2">
          ターミナルシミュレーターで実際に手を動かしてみよう
        </p>
      </div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-github-surface border border-github-border rounded-xl p-4 mb-6 text-sm"
      >
        <span className="text-github-text font-semibold">🖥️ ターミナルシミュレーターについて</span>
        <p className="mt-1 text-github-muted">
          実際のターミナル（コマンドライン）に似た画面で、Gitコマンドを練習できます。
          本物のターミナルではないので、何度でも気軽に試してください！
        </p>
      </motion.div>

      {/* Exercise tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {EXERCISES.map((ex, idx) => {
          const done = isExerciseCompleted(ex.id)
          return (
            <button
              key={ex.id}
              onClick={() => setCurrentExercise(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all border ${
                currentExercise === idx
                  ? 'bg-github-blue/10 border-github-blue text-github-blue'
                  : done
                  ? 'bg-github-accent/10 border-github-accent/30 text-github-accent'
                  : 'bg-github-darker border-github-border text-github-muted hover:text-github-text'
              }`}
            >
              {done ? <CheckCircle size={13} /> : <Circle size={13} />}
              演習{idx + 1}
            </button>
          )
        })}
      </div>

      {/* Exercise content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExercise}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-github-surface border border-github-border rounded-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-github-text mb-2">{exercise.title}</h2>
            <p className="text-github-muted text-sm">{exercise.description}</p>
          </div>

          <Terminal
            key={`${currentExercise}-${exerciseKeys[currentExercise] || 0}`}
            exercise={exercise}
            onSuccess={handleExerciseSuccess}
            isCompleted={isExerciseCompleted(exercise.id) && (exerciseKeys[currentExercise] || 0) === 0}
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={resetExercise}
              className="text-github-muted hover:text-github-text text-sm px-3 py-1.5 rounded border border-github-border hover:bg-github-darker transition-colors"
            >
              🔄 リセット
            </button>
            {currentExercise < EXERCISES.length - 1 && (
              <button
                onClick={() => setCurrentExercise(prev => prev + 1)}
                className="text-github-blue hover:text-white text-sm px-3 py-1.5 rounded border border-github-blue/30 hover:bg-github-blue/10 transition-colors ml-auto"
              >
                次の演習へ →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PR Mock (Exercise 5 supplement) */}
      {currentExercise === EXERCISES.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-github-surface border border-github-border rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-github-text mb-4">
            🐙 GitHubのプルリクエスト画面（モック）
          </h3>
          <div className="bg-github-darker rounded-lg border border-github-border overflow-hidden">
            {/* PR header mock */}
            <div className="p-4 border-b border-github-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-github-accent text-white text-xs px-2 py-0.5 rounded-full">Open</span>
                <span className="text-github-text font-semibold">新機能: ダッシュボードを追加</span>
              </div>
              <p className="text-github-muted text-sm">
                k.adachi が 2 時間前に feature/dashboard から main へ
              </p>
            </div>
            {/* PR tabs mock */}
            <div className="flex border-b border-github-border text-sm">
              {['会話', '変更されたファイル'].map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${idx === 0 ? 'text-github-text border-b-2 border-github-orange' : 'text-github-muted'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Comment mock */}
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-github-blue/20 flex items-center justify-center text-github-blue text-sm font-bold flex-shrink-0">
                  T
                </div>
                <div className="flex-1 border border-github-border rounded-lg p-3 bg-github-surface">
                  <div className="text-github-muted text-xs mb-2">tanaka が 1 時間前にコメント</div>
                  <p className="text-github-text text-sm">
                    確認しました！デザインが綺麗でいい感じです 👍<br />
                    一点だけ: エラーハンドリングも追加できますか？
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button className="bg-github-accent hover:bg-github-accentHover text-white text-sm px-4 py-1.5 rounded-lg transition-colors">
                  マージする
                </button>
                <button className="bg-github-darker border border-github-border text-github-text text-sm px-4 py-1.5 rounded-lg hover:bg-github-surface transition-colors">
                  閉じる
                </button>
              </div>
            </div>
          </div>
          <p className="text-github-muted text-xs mt-3">
            ※ これはデモ表示です。実際のGitHubのプルリクエスト画面に似ています。
          </p>
        </motion.div>
      )}

      {/* Progress summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-github-surface border border-github-border rounded-xl p-4"
      >
        <p className="text-sm text-github-muted mb-2">演習の進捗</p>
        <div className="flex gap-2">
          {EXERCISES.map((ex) => {
            const done = isExerciseCompleted(ex.id)
            return (
              <div
                key={ex.id}
                className={`flex-1 h-2 rounded-full ${done ? 'bg-github-accent' : 'bg-github-border'}`}
              />
            )
          })}
        </div>
        <p className="text-xs text-github-muted mt-1">
          {EXERCISES.filter(ex => isExerciseCompleted(ex.id)).length} / {EXERCISES.length} 完了
        </p>
      </motion.div>

      {/* Complete button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        {isDone ? (
          <button
            onClick={() => navigate('/progress')}
            className="bg-github-surface border border-github-border text-github-text font-semibold px-8 py-3 rounded-lg hover:bg-github-darker transition-colors"
          >
            🏆 進捗・バッジを確認する →
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className={`font-semibold px-8 py-3 rounded-lg transition-colors ${
              allExercisesDone
                ? 'bg-github-accent hover:bg-github-accentHover text-white'
                : 'bg-github-surface border border-github-border text-github-text hover:bg-github-darker'
            }`}
          >
            {allExercisesDone
              ? '🎓 全演習完了！進捗を確認する →'
              : '✅ Chapter 4 完了！進捗を確認する →'}
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
