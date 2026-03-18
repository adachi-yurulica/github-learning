import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercise } from './commands'
import { useTerminal } from './useTerminal'

interface TerminalProps {
  exercise: Exercise
  onSuccess: () => void
  isCompleted?: boolean
}

export function Terminal({ exercise, onSuccess, isCompleted = false }: TerminalProps) {
  const { lines, inputValue, setInputValue, submitCommand, completed } =
    useTerminal(exercise, onSuccess)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (!completed && !isCompleted) {
      inputRef.current?.focus()
    }
  }, [completed, isCompleted])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand()
    }
  }

  const lineColorClass = (type: string) => {
    switch (type) {
      case 'input': return 'text-github-text'
      case 'output': return 'text-github-accent font-mono text-sm'
      case 'success': return 'text-green-400 font-semibold'
      case 'error': return 'text-github-red'
      case 'info': return 'text-github-muted'
      default: return 'text-github-text'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg overflow-hidden border border-github-border shadow-2xl"
    >
      {/* Title bar */}
      <div className="bg-[#1c1c1e] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-github-muted text-xs mx-auto font-mono">
          Terminal — github-learning
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="bg-[#0a0a0a] p-4 min-h-[200px] max-h-[400px] overflow-y-auto font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`whitespace-pre-wrap mb-1 ${lineColorClass(line.type)}`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input line */}
        {!completed && !isCompleted && (
          <div className="flex items-center mt-1">
            <span className="text-green-400 mr-2 select-none">
              user@github-learning:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-github-text flex-1 font-mono text-sm focus:outline-none caret-green-400"
              placeholder=""
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <span className="cursor-blink text-green-400 ml-0.5">▌</span>
          </div>
        )}

        {(completed || isCompleted) && (
          <div className="mt-2 text-green-400">
            <span className="mr-2">✅</span>
            演習クリア！次の演習に進みましょう。
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </motion.div>
  )
}
