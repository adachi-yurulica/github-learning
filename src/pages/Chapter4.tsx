// Chapter4: エンジニア以外向けハンズオン — GitHub Web UI だけで完結
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { CheckCircle, Circle, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface StepData {
  id: string
  step: number
  icon: string
  title: string
  goal: string
  content: React.ReactNode
  /** このSTEPにインタラクティブ要素があるか */
  hasInteractive?: boolean
}

// ─── ステップ定義 ──────────────────────────────────────────────────────────────

function Step1Content() {
  return (
    <div className="space-y-4">
      <p className="text-github-muted text-sm">
        まず GitHub にログインして、自分のプロフィールを確認してみましょう。
      </p>

      {/* 手順 */}
      <ol className="space-y-2 text-sm">
        {[
          '🌐 https://github.com を開く',
          '👤 右上のアイコンをクリック',
          '📋「Your profile」を選択',
          '✅ プロフィールページが表示される',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-github-text">
            <span className="text-github-accent font-bold mt-0.5">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>

      {/* モックUI: GitHub ナビゲーションバー */}
      <div className="rounded-lg overflow-hidden border border-github-border mt-4">
        <div className="bg-[#24292f] px-4 py-2.5 flex items-center gap-3 text-sm">
          <span className="text-white font-bold text-base">🐙 GitHub</span>
          <div className="flex-1 bg-[#0d1117] rounded border border-[#30363d] px-3 py-1 text-github-muted text-xs">
            Search GitHub...
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-white text-lg">🔔</span>
            <div className="w-7 h-7 rounded-full bg-github-blue flex items-center justify-center text-white text-xs font-bold relative">
              You
              <div className="absolute -bottom-5 right-0 text-yellow-400 text-xs whitespace-nowrap">
                ↑ ここ！
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-github-muted text-xs mt-6">
        ↑ 右上のアイコンからプロフィールにアクセスできます
      </p>

      {/* チェックポイント */}
      <div className="bg-github-surface border border-github-border rounded-lg p-3 text-sm mt-2">
        <p className="font-semibold text-github-text mb-2">✅ チェックポイント</p>
        <ul className="space-y-1 text-github-muted">
          <li>□ 自分の名前が表示されている</li>
          <li>□ アイコン画像が設定されている</li>
        </ul>
        <p className="text-xs text-github-muted mt-2 border-t border-github-border pt-2">
          💡 プロフィール画像は設定しておくと、チームメンバーに顔を覚えてもらいやすくなります！
        </p>
      </div>
    </div>
  )
}

function Step2Content() {
  return (
    <div className="space-y-4">
      <p className="text-github-muted text-sm">
        チームのリポジトリ（プロジェクト置き場）を開いて、ファイルを閲覧してみましょう。
      </p>

      <ol className="space-y-2 text-sm">
        {[
          '🔗 担当エンジニアにリポジトリのURLを聞く',
          '🌐 URLをブラウザで開く',
          '📁 ファイル一覧が表示される',
          '📄 ファイルをクリックして中身を確認',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-github-text">
            <span className="text-github-accent font-bold mt-0.5">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>

      {/* モックUI: リポジトリのファイル一覧 */}
      <div className="rounded-lg overflow-hidden border border-github-border mt-2">
        <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-github-border">
          <span className="text-github-text text-sm font-semibold">📁 my-project</span>
        </div>
        <div className="bg-[#0d1117] divide-y divide-github-border text-sm font-mono">
          {[
            { name: '📁 src/', note: '' },
            { name: '📁 public/', note: '' },
            { name: '📄 README.md', note: '← まずここを見よう！' },
            { name: '📄 package.json', note: '' },
          ].map((file, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-2 ${
                file.note ? 'bg-github-blue/5' : ''
              }`}
            >
              <span className={file.note ? 'text-github-blue' : 'text-github-text'}>
                {file.name}
              </span>
              {file.note && (
                <span className="text-github-blue text-xs">{file.note}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-github-surface border border-github-border rounded-lg p-3 text-sm">
        <p className="font-semibold text-github-text mb-2">📌 見るべきポイント</p>
        <ul className="space-y-1 text-github-muted">
          <li>📁 ファイル一覧 — プロジェクトの構成がわかる</li>
          <li>📝 README.md — プロジェクトの説明書</li>
          <li>🕐 コミット履歴 — 誰が何を変更したかの記録</li>
        </ul>
      </div>
    </div>
  )
}

function Step3Content({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!title.trim()) return
    setSubmitted(true)
    onComplete()
  }

  return (
    <div className="space-y-4">
      <p className="text-github-muted text-sm">
        バグ報告や要望を Issue（チケット）として登録してみましょう。
        エンジニア以外でも Issue を立てることで、チームに情報を伝えられます。
      </p>

      <div className="bg-github-surface border border-yellow-500/30 rounded-lg p-3 text-sm">
        <p className="font-semibold text-yellow-400 mb-1">💡 良い Issue の書き方</p>
        <ul className="text-github-muted space-y-0.5">
          <li>タイトル: 簡潔に（例: 「ログインボタンが押せない」）</li>
          <li>どこで？ どうなった？ いつから？ を書く</li>
        </ul>
      </div>

      <ol className="space-y-1 text-sm text-github-text">
        {[
          'リポジトリを開く',
          '「Issues」タブをクリック',
          '「New issue」ボタンをクリック',
          'タイトルと内容を入力して「Submit」',
        ].map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-github-accent font-bold">{i + 1}.</span>
            {s}
          </li>
        ))}
      </ol>

      {/* インタラクティブ: Issue 作成フォームモック */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-github-accent bg-github-accent/10 p-5 text-center"
        >
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-github-accent font-bold text-lg">Issue を立てました！</p>
          <p className="text-github-muted text-sm mt-1">
            「{title}」が登録されました
          </p>
        </motion.div>
      ) : (
        <div className="rounded-lg border border-github-border overflow-hidden">
          <div className="bg-[#161b22] px-4 py-2 border-b border-github-border">
            <span className="text-github-text text-sm font-semibold">New Issue</span>
          </div>
          <div className="bg-[#0d1117] p-4 space-y-3">
            <div>
              <label className="text-github-muted text-xs mb-1 block">タイトル *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="例: ログインページのボタンが押せない"
                className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-github-text text-sm focus:outline-none focus:border-github-blue transition-colors"
              />
            </div>
            <div>
              <label className="text-github-muted text-xs mb-1 block">内容（任意）</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="どこで？ どうなった？ いつから？"
                rows={4}
                className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-github-text text-sm focus:outline-none focus:border-github-blue transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="bg-github-accent hover:bg-github-accentHover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              Submit new issue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Step4Content() {
  return (
    <div className="space-y-4">
      <p className="text-github-muted text-sm">
        エンジニアのプルリクエスト（PR）にコメントを残してみましょう。
        PR レビューはエンジニアだけの仕事ではありません！
      </p>

      <div className="bg-github-surface border border-github-blue/30 rounded-lg p-3 text-sm">
        <p className="font-semibold text-github-blue mb-1">🙌 こんなコメントが喜ばれます</p>
        <ul className="text-github-muted space-y-1">
          <li>✅「この文言、「送信する」の方が分かりやすいかも？」</li>
          <li>✅「スマホで確認したら崩れていました📱」</li>
          <li>✅「LGTM 👍（良さそうです）」</li>
        </ul>
      </div>

      <ol className="space-y-1 text-sm text-github-text">
        {[
          '「Pull requests」タブを開く',
          'オープンな PR をクリック',
          '「Files changed」タブで変更を確認',
          '行の左の「＋」をクリック',
          'コメントを入力して「Add single comment」',
        ].map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-github-accent font-bold">{i + 1}.</span>
            {s}
          </li>
        ))}
      </ol>

      {/* モックUI: PR コメント画面 */}
      <div className="rounded-lg border border-github-border overflow-hidden text-xs font-mono">
        <div className="bg-[#161b22] px-3 py-2 border-b border-github-border text-github-muted">
          Files changed
        </div>
        <div className="bg-[#0d1117]">
          <div className="flex">
            <div className="w-8 bg-red-500/10 text-red-400 px-2 py-1.5 text-center border-r border-github-border">
              −
            </div>
            <div className="flex-1 px-3 py-1.5 text-red-400">- old text here</div>
          </div>
          <div className="flex">
            <div className="w-8 bg-green-500/10 text-green-400 px-2 py-1.5 text-center border-r border-github-border">
              +
            </div>
            <div className="flex-1 px-3 py-1.5 text-green-400">+ new text here</div>
          </div>
          <div className="border-t border-github-border bg-[#161b22] px-3 py-2">
            <div className="bg-[#0d1117] border border-github-border rounded p-2 text-github-muted">
              コメントを入力...
            </div>
            <button className="mt-2 bg-github-accent text-white text-xs px-3 py-1.5 rounded">
              Add comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step5Content({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <p className="text-github-muted text-sm">
        ブラウザだけでファイルを直接編集できます！
        簡単な誤字修正や README の更新ならターミナル不要です。
      </p>

      <ol className="space-y-2 text-sm">
        {[
          '📄 編集したいファイルを開く（例: README.md）',
          '✏️ 右上の鉛筆アイコンをクリック',
          '📝 内容を編集する',
          '💬 「Commit changes」でコミットメッセージを入力',
          '✅「Commit changes」ボタンで保存',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-github-text">
            <span className="text-github-accent font-bold mt-0.5">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>

      {/* 使える場面 */}
      <div className="bg-github-surface border border-github-border rounded-lg p-3 text-sm">
        <p className="font-semibold text-github-text mb-1">💡 こんな場面で使える</p>
        <ul className="text-github-muted space-y-0.5">
          <li>・ README の誤字修正</li>
          <li>・ ドキュメントの更新</li>
          <li>・ 設定ファイルの簡単な変更</li>
        </ul>
      </div>

      {/* 注意 */}
      <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-lg p-3 text-sm">
        <p className="font-semibold text-yellow-400 mb-1">⚠️ 注意</p>
        <p className="text-github-muted">
          直接 main ブランチを編集するのは重要なファイルでは避けましょう。
          「Create a new branch」を選ぶのが安全です。
        </p>
      </div>

      {/* モックUI: ファイル編集画面 */}
      <div className="rounded-lg border border-github-border overflow-hidden text-sm">
        <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-github-border">
          <span className="text-github-text font-mono text-xs">README.md</span>
          <button className="flex items-center gap-1 text-github-muted hover:text-github-text transition-colors text-xs border border-github-border rounded px-2 py-1">
            ✏️ Edit
          </button>
        </div>
        <div className="bg-[#0d1117] p-4 font-mono text-xs text-github-muted">
          <p className="text-github-text">## My Project</p>
          <p className="mt-1">このリポジトリはサンプルです。</p>
        </div>
      </div>

      {/* 完了ボタン */}
      <button
        onClick={onComplete}
        className="w-full mt-2 bg-github-accent hover:bg-github-accentHover text-white font-semibold py-3 rounded-lg transition-colors"
      >
        ✅ この演習を完了する
      </button>
    </div>
  )
}

// ─── メインコンポーネント ────────────────────────────────────────────────────────

export function Chapter4() {
  const navigate = useNavigate()
  const { completeChapter, completeExercise, isChapterCompleted, isExerciseCompleted } =
    useProgress()
  const isDone = isChapterCompleted(4)

  const [currentStep, setCurrentStep] = useState(0)
  // Step 3 の Issue フォーム完了フラグ
  const [_issueCompleted, setIssueCompleted] = useState(false)

  // 各 STEP の完了 ID
  const STEP_IDS = ['web_account', 'web_repo', 'web_issue', 'web_pr', 'web_edit']

  const handleStepCheck = (id: string) => {
    completeExercise(id)
  }

  const allDone = STEP_IDS.every(id => isExerciseCompleted(id))

  const handleComplete = () => {
    completeChapter(4)
    navigate('/progress')
  }

  const goNext = () => {
    if (currentStep < STEP_IDS.length - 1) setCurrentStep(prev => prev + 1)
  }

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }

  // ─ STEP 定義 ─
  const STEPS: StepData[] = [
    {
      id: STEP_IDS[0],
      step: 1,
      icon: '👤',
      title: 'GitHubアカウントを確認しよう',
      goal: 'GitHubにログインして、プロフィールを確認する',
      content: <Step1Content />,
    },
    {
      id: STEP_IDS[1],
      step: 2,
      icon: '📁',
      title: 'リポジトリ（プロジェクト）を見てみよう',
      goal: 'チームのリポジトリを開いてファイルを閲覧する',
      content: <Step2Content />,
    },
    {
      id: STEP_IDS[2],
      step: 3,
      icon: '📋',
      title: 'Issueを立てよう',
      goal: 'バグ報告や要望をIssueとして登録する',
      content: (
        <Step3Content
          onComplete={() => {
            setIssueCompleted(true)
            handleStepCheck(STEP_IDS[2])
          }}
        />
      ),
      hasInteractive: true,
    },
    {
      id: STEP_IDS[3],
      step: 4,
      icon: '💬',
      title: 'プルリクエストにコメントしよう',
      goal: 'エンジニアのPRにコメントを残す',
      content: <Step4Content />,
    },
    {
      id: STEP_IDS[4],
      step: 5,
      icon: '✏️',
      title: 'ファイルをブラウザで直接編集しよう',
      goal: 'README.mdをブラウザから直接編集する',
      content: (
        <Step5Content
          onComplete={() => handleStepCheck(STEP_IDS[4])}
        />
      ),
      hasInteractive: true,
    },
  ]

  const step = STEPS[currentStep]

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
        <div className="text-github-muted text-sm mb-2">Chapter 4</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">👤</span>
          エンジニア以外向けハンズオン
        </h1>
        <p className="text-github-muted mt-1">GitHub Web UI だけで完結</p>

        {/* 対象者バッジ */}
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold">
          👤 全員向け — ターミナル不要！
        </div>
      </div>

      {/* 導入説明 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-github-surface border border-github-border rounded-xl p-4 mb-6 text-sm"
      >
        <span className="text-github-text font-semibold">🌐 このハンズオンについて</span>
        <p className="mt-1 text-github-muted">
          ブラウザだけで GitHub を使いこなしましょう。
          コマンド・ターミナルは一切不要。Issue を立てたり、PR にコメントしたり、
          ファイルを編集したりできるようになります！
        </p>
      </motion.div>

      {/* ステップインジケーター */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-github-muted text-sm">
          STEP {step.step} / {STEPS.length}
        </span>
        <div className="flex gap-2">
          {STEPS.map((s, idx) => {
            const done = isExerciseCompleted(s.id)
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                title={s.title}
                className={`w-3 h-3 rounded-full transition-all border ${
                  idx === currentStep
                    ? 'bg-blue-500 border-blue-400 scale-125'
                    : done
                    ? 'bg-github-accent border-github-accent'
                    : 'bg-github-border border-github-border hover:bg-github-muted'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* ステップカード（アニメーション付き） */}
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
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{step.icon}</span>
              <h2 className="text-lg font-bold text-github-text flex-1">{step.title}</h2>
              {isExerciseCompleted(step.id) && (
                <CheckCircle size={18} className="text-github-accent flex-shrink-0" />
              )}
            </div>
            <p className="text-github-muted text-sm ml-12">
              <span className="text-github-blue font-semibold">🎯 目標: </span>
              {step.goal}
            </p>
          </div>

          {/* ステップ内容 */}
          <div className="bg-github-surface border border-github-border rounded-xl p-5">
            {step.content}
          </div>

          {/* 「完了した」チェックボックス（インタラクティブでない STEP のみ） */}
          {!step.hasInteractive && (
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => handleStepCheck(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                  isExerciseCompleted(step.id)
                    ? 'border-github-accent bg-github-accent/10 text-github-accent'
                    : 'border-github-border bg-github-darker text-github-muted hover:border-github-blue hover:text-github-text'
                }`}
              >
                {isExerciseCompleted(step.id) ? (
                  <CheckCircle size={15} />
                ) : (
                  <Circle size={15} />
                )}
                {isExerciseCompleted(step.id) ? '✅ 完了しました！' : '✅ 完了した'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 前へ / 次へ ナビゲーション */}
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
          {STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentStep ? 'bg-blue-500 scale-125' : 'bg-github-border'
              }`}
            />
          ))}
        </div>

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-blue-500/50 text-blue-300 text-sm hover:bg-blue-500/10 transition-colors"
          >
            次へ
            <ChevronRight size={16} />
          </button>
        ) : (
          <div className="w-20" />
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
          <p className="text-sm text-github-muted">ステップの進捗</p>
          <span className="text-xs text-github-muted">
            {STEP_IDS.filter(id => isExerciseCompleted(id)).length} / {STEP_IDS.length} 完了
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEP_IDS.map(id => (
            <div
              key={id}
              className={`flex-1 h-2 rounded-full transition-all ${
                isExerciseCompleted(id) ? 'bg-github-accent' : 'bg-github-border'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* 全 STEP 完了バッジ */}
      {allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center bg-github-accent/10 border border-github-accent/30 rounded-xl p-4"
        >
          <p className="text-3xl mb-1">🏅</p>
          <p className="text-github-accent font-bold">全ステップ完了！</p>
          <p className="text-github-muted text-sm mt-0.5">
            GitHub Web UI マスターバッジを獲得しました
          </p>
        </motion.div>
      )}

      {/* Chapter 完了ボタン */}
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
              allDone
                ? 'bg-github-accent hover:bg-github-accentHover text-white'
                : 'bg-github-surface border border-github-border text-github-text hover:bg-github-darker'
            }`}
          >
            {allDone
              ? '🎓 全STEP完了！進捗を確認する →'
              : '✅ Chapter 4 完了！進捗を確認する →'}
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
