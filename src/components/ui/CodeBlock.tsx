import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = 'bash', filename }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-github-border">
      {filename && (
        <div className="bg-github-surface px-4 py-1.5 text-xs text-github-muted border-b border-github-border font-mono">
          📄 {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          background: '#0d1117',
          fontSize: '0.875rem',
          padding: '1rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
