import { useState, useCallback } from 'react'
import type { Exercise } from './commands'

export interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'error' | 'info'
  text: string
}

export function useTerminal(exercise: Exercise, onSuccess: () => void) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', text: `📋 ${exercise.description}` },
    { type: 'info', text: `💡 ヒント: ${exercise.hint}` },
  ])
  const [inputValue, setInputValue] = useState('')
  const [completed, setCompleted] = useState(false)

  const addLine = useCallback((line: TerminalLine) => {
    setLines(prev => [...prev, line])
  }, [])

  const submitCommand = useCallback(() => {
    const cmd = inputValue.trim()
    if (!cmd) return

    addLine({ type: 'input', text: `$ ${cmd}` })
    setInputValue('')

    const isCorrect = exercise.expectedCommands.some(expected =>
      cmd.toLowerCase().includes(expected.toLowerCase())
    )

    if (isCorrect) {
      addLine({ type: 'output', text: exercise.successOutput })
      addLine({ type: 'success', text: exercise.successMessage })
      setCompleted(true)
      onSuccess()
    } else if (cmd === 'help' || cmd === 'git help') {
      addLine({
        type: 'info',
        text: `ヒント: ${exercise.hint}`,
      })
    } else if (cmd === 'clear') {
      setLines([
        { type: 'info', text: `📋 ${exercise.description}` },
        { type: 'info', text: `💡 ヒント: ${exercise.hint}` },
      ])
    } else {
      addLine({
        type: 'error',
        text: `bash: ${cmd.split(' ')[0]}: command not found or incorrect answer`,
      })
      addLine({
        type: 'info',
        text: `💡 もう一度試してみましょう。ヒント: ${exercise.hint}`,
      })
    }
  }, [inputValue, exercise, addLine, onSuccess])

  return {
    lines,
    inputValue,
    setInputValue,
    submitCommand,
    completed,
  }
}
