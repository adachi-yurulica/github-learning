// Chapter5: エンジニア向けハンズオン — Claude Code × GitHub
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Terminal } from '../components/terminal/Terminal'
import { ENGINEER_EXERCISES } from '../components/terminal/commands'
import type { Exercise } from '../components/terminal/commands'
import { useProgress } from '../hooks/useProgress'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * EngineerExercise を Terminal コンポーネントが受け取る
 * Exercise 形式に変換するアダプター
 */
function toTerminalExercise(ex: (typeof ENGINEER_EXERCISES)[number]): Exercise {
  return {
    id: ex.id,
    title: ex.title,
    description: ex.description,
    hint: ex.hint ?? ex.simulatorCommand ?? '',
    expectedCommands: ex.expectedCommands ?? [],
    successMessage: ex.successMessage ?? '✅ 完了！',
    successOutput: ex.successOutput ?? '',
  }
}

export function Chapter5() {
  const navigate = useNavigate()
  const { completeChapter, completeExercise, isChapterCompleted, isExerciseCompleted } =
    useProgress()
  const isDone = isChapterCompleted(5)
  const [currentStep, setCurrentStep] = useState(0)
  // ターミナルのリセット用キー
  const [terminalKeys, setTerminalKeys] = useState<Record<number, number>>({})

  const exercise = ENGINEER_EXERCISES[currentStep]
  const totalSteps = ENGINEER_EXERCISES.length

  // 全ターミナル演習（isInfo でないもの）が完了しているか
  const allExercisesDone = ENGINEER_EXERCISES.filter(ex => !ex.isInfo).every(ex =>
    isExerciseCompleted(ex.id)
  )

  const handleExerciseSuccess = () => {
    completeExercise(exercise.id)
  }

  const handleComplete = () => {
    completeChapter(5)
    navigate('/progress')
  }

  const goNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1)
  }

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  const resetTerminal = () => {
    setTerminalKeys(prev => ({
      ...prev,
      [currentStep]: (prev[currentStep] || 0) + 1,
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
      {/* Chapter ヘッダー */}
      <div className="mb-8">
        <div className="text-github-muted text-sm mb-2">Chapter 5</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">🤖</span>
          エンジニア向けハンズオン
        </h1>
        <p className="text-github-muted mt-1">Claude Code × GitHub</p>

        {/* 特別バッジ */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 text-sm font-semibold">
          🤖 AI × Git = 最強ワークフロー
        </div>
      </div>

      {/* Claude Code 紹介カード */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-github-surface border border-github-border rounded-xl p-4 mb-6 text-sm"
      >
        <span className="text-github-text font-semibold">💡 Claude Code とは？</span>
        <p className="mt-1 text-github-muted">
          Anthropic が開発した AI コーディングアシスタント。
          日本語で話しかけるだけで Git 操作・コード生成・GitHub 連携ができます。
        </p>
      </motion.div>

      {/* ステップインジケーター */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-github-muted text-sm">
          STEP {exercise.step} / {totalSteps}
        </span>
        <div className="flex gap-2">
          {ENGINEER_EXERCISES.map((ex, idx) => {
            const done = !ex.isInfo && isExerciseCompleted(ex.id)
            return (
              <button
                key={ex.id}
                onClick={() => setCurrentStep(idx)}
                title={ex.title}
                className={`w-3 h-3 rounded-full transition-all border ${
                  idx === currentStep
                    ? 'bg-pink-500 border-pink-400 scale-125'
                    : done
                    ? 'bg-github-accent border-github-accent'
                    : 'bg-github-border border-github-border hover:bg-github-muted'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* 演習コンテンツ（アニメーション付き） */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* ステップタイトルカード */}
          <div className="bg-github-surface border border-github-border rounded-xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{exercise.icon}</span>
              <h2 className="text-lg font-bold text-github-text">{exercise.title}</h2>
              {!exercise.isInfo && isExerciseCompleted(exercise.id) && (
                <CheckCircle size={18} className="text-github-accent ml-auto flex-shrink-0" />
              )}
            </div>
            <p className="text-github-muted text-sm">{exercise.description}</p>
          </div>

          {exercise.isInfo ? (
            /* 説明カード（ターミナル不要） */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 text-sm"
            >
              {exercise.content.split('\n').map((line, i) => {
                // 「【...】」行は強調
                if (line.match(/^【.+】$/)) {
                  return (
                    <p key={i} className="text-purple-300 font-bold mt-3 mb-1 first:mt-0">
                      {line}
                    </p>
                  )
                }
                // 「✅」「①②③」を含む行
                if (line.match(/^[✅①②③]/)) {
                  return (
                    <p key={i} className="text-github-accent ml-2 mb-0.5">
                      {line}
                    </p>
                  )
                }
                // 数字箇条書き
                if (line.match(/^\d+\./)) {
                  return (
                    <p key={i} className="text-github-text ml-2 mb-0.5">
                      {line}
                    </p>
                  )
                }
                return line ? (
                  <p key={i} className="text-github-muted mb-0.5">
                    {line}
                  </p>
                ) : (
                  <br key={i} />
                )
              })}
            </motion.div>
          ) : (
            /* Claude Code への指示例 + ターミナルシミュレーター */
            <div>
              {/* 引用ブロック: Claude Code への指示例（ピンク/紫アクセント） */}
              <div className="border-l-4 border-pink-500 bg-pink-500/5 rounded-r-xl p-4 mb-4 text-sm">
                {exercise.content.split('\n').map((line, i) => {
                  if (line.match(/^【.+】$/)) {
                    return (
                      <p key={i} className="text-pink-300 font-bold mt-2 mb-1 first:mt-0">
                        {line}
                      </p>
                    )
                  }
                  if (line.match(/^[✅]/)) {
                    return (
                      <p key={i} className="text-github-accent ml-1 mb-0.5">
                        {line}
                      </p>
                    )
                  }
                  return line ? (
                    <p key={i} className="text-github-muted mb-0.5">
                      {line}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                })}
              </div>

              {/* ターミナルシミュレーター */}
              <Terminal
                key={`${currentStep}-${terminalKeys[currentStep] || 0}`}
                exercise={toTerminalExercise(exercise)}
                onSuccess={handleExerciseSuccess}
                isCompleted={
                  isExerciseCompleted(exercise.id) && (terminalKeys[currentStep] || 0) === 0
                }
              />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={resetTerminal}
                  className="text-github-muted hover:text-github-text text-sm px-3 py-1.5 rounded border border-github-border hover:bg-github-darker transition-colors"
                >
                  🔄 リセット
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 前へ / 次へナビゲーション */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-github-border text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-github-darker text-github-text"
        >
          <ChevronLeft size={16} />
          前へ
        </button>

        {/* ドットインジケーター（中央） */}
        <div className="flex gap-2">
          {ENGINEER_EXERCISES.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentStep ? 'bg-pink-500 scale-125' : 'bg-github-border'
              }`}
            />
          ))}
        </div>

        {currentStep < totalSteps - 1 ? (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-pink-500/50 text-pink-300 text-sm hover:bg-pink-500/10 transition-colors"
          >
            次へ
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="w-20" /> // スペース確保
        )}
      </div>

      {/* 進捗バー */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-github-surface border border-github-border rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-github-muted">演習の進捗</p>
          <span className="text-xs text-github-muted">
            {ENGINEER_EXERCISES.filter(ex => !ex.isInfo && isExerciseCompleted(ex.id)).length}
            {' '}/ {ENGINEER_EXERCISES.filter(ex => !ex.isInfo).length} 完了
          </span>
        </div>
        <div className="flex gap-1.5">
          {ENGINEER_EXERCISES.filter(ex => !ex.isInfo).map(ex => {
            const done = isExerciseCompleted(ex.id)
            return (
              <div
                key={ex.id}
                className={`flex-1 h-2 rounded-full transition-all ${
                  done ? 'bg-github-accent' : 'bg-github-border'
                }`}
              />
            )
          })}
        </div>
      </motion.div>

      {/* 完了ボタン */}
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
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg'
                : 'bg-github-surface border border-github-border text-github-text hover:bg-github-darker'
            }`}
          >
            {allExercisesDone
              ? '🎓 全STEP完了！進捗を確認する →'
              : '✅ Chapter 5 完了！進捗を確認する →'}
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
