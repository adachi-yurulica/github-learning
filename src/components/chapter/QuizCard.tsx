import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizOption {
  text: string
  correct: boolean
}

interface QuizCardProps {
  question: string
  options: QuizOption[]
  explanation: string
}

export function QuizCard({ question, options, explanation }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setShowExplanation(true)
  }

  const isCorrect = selected !== null && options[selected].correct

  return (
    <div className="bg-github-surface border border-github-border rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🧠</span>
        <h3 className="text-lg font-bold text-github-text">理解度チェック</h3>
      </div>
      <p className="text-github-text mb-4">{question}</p>

      <div className="space-y-2">
        {options.map((option, idx) => {
          let style = 'border-github-border bg-github-darker hover:border-github-blue cursor-pointer'
          if (selected !== null) {
            if (option.correct) {
              style = 'border-github-accent bg-github-accent/10 cursor-default'
            } else if (idx === selected && !option.correct) {
              style = 'border-github-red bg-github-red/10 cursor-default'
            } else {
              style = 'border-github-border bg-github-darker cursor-default opacity-50'
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-github-text text-sm ${style}`}
            >
              {option.correct && selected !== null && '✅ '}
              {!option.correct && idx === selected && selected !== null && '❌ '}
              {option.text}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div
              className={`p-3 rounded-lg text-sm ${
                isCorrect
                  ? 'bg-github-accent/10 border border-github-accent text-github-text'
                  : 'bg-github-red/10 border border-github-red text-github-text'
              }`}
            >
              <span className="font-semibold">{isCorrect ? '🎉 正解！' : '😢 残念...'}</span>
              <p className="mt-1">{explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
