import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../components/chapter/SectionCard'
import { CalloutBox } from '../components/ui/CalloutBox'
import { QuizCard } from '../components/chapter/QuizCard'
import { useProgress } from '../hooks/useProgress'

export function Chapter1() {
  const navigate = useNavigate()
  const { completeChapter, isChapterCompleted } = useProgress()
  const isDone = isChapterCompleted(1)

  const handleComplete = () => {
    completeChapter(1)
    navigate('/chapter/2')
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
        <div className="text-github-muted text-sm mb-2">Chapter 1</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">📦</span>
          Gitとは？
        </h1>
        <p className="text-github-muted mt-2">
          ゲームのセーブポイントでGitを理解しよう
        </p>
      </div>

      {/* Section 1-1 */}
      <SectionCard title='Gitは、作業の"セーブポイント"' emoji="🎮" delay={0.1}>
        <div className="space-y-4">
          {/* Visual comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-github-red/10 border border-github-red/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">😱</div>
              <p className="font-semibold text-github-red text-sm">Gitなし</p>
              <p className="text-github-muted text-xs mt-1">
                失敗したら最初からやり直し...
              </p>
            </div>
            <div className="bg-github-accent/10 border border-github-accent/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎮✨</div>
              <p className="font-semibold text-github-accent text-sm">Git有り</p>
              <p className="text-github-muted text-xs mt-1">
                いつでもセーブポイントに戻れる！
              </p>
            </div>
          </div>

          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">Gitとは、ファイルの変更履歴を記録するツールです。</strong>
            ゲームのセーブポイントのように、「この状態に戻りたい」というときに、
            過去の状態に戻ることができます。
          </p>

          <p className="text-github-text leading-relaxed">
            例えば、Excelでの作業を考えてみましょう。こういう経験、ありませんか？
          </p>

          <div className="bg-github-darker rounded-lg p-4 font-mono text-sm space-y-1">
            <div className="text-github-muted">📄 売上管理.xlsx</div>
            <div className="text-github-muted">📄 売上管理_修正版.xlsx</div>
            <div className="text-github-muted">📄 売上管理_最終.xlsx</div>
            <div className="text-github-yellow">📄 売上管理_最終_本当に最終.xlsx 😅</div>
          </div>

          <CalloutBox type="tip" title="Gitを使えば">
            ファイル名で管理しなくてもよくなります！
            Gitが全ての変更履歴を自動的に管理してくれます。
          </CalloutBox>
        </div>
      </SectionCard>

      {/* Section 1-2 */}
      <SectionCard title="リポジトリ = プロジェクトの保管箱" emoji="📦" delay={0.2}>
        <div className="space-y-3">
          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">リポジトリ（Repository）</strong>とは、
            フォルダとファイルをひとまとめにした「箱」のことです。
          </p>
          <p className="text-github-text leading-relaxed">
            箱の中には、全ての変更履歴が記録されています。いつ・誰が・何を変えたか、
            全部記録されているので、いつでも過去の状態に戻れます。
          </p>
          <div className="bg-github-darker rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-github-text font-semibold">リポジトリ</div>
            <div className="text-github-muted text-sm mt-1">
              = プロジェクトのファイル + 全変更履歴
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 1-3 */}
      <SectionCard title="コミット = セーブする行為" emoji="💾" delay={0.3}>
        <div className="space-y-4">
          <p className="text-github-text leading-relaxed">
            変更をGitに記録することを<strong className="text-github-yellow">「コミット（commit）」</strong>と言います。
            コミットには必ずメッセージを付けます。
          </p>

          <div className="bg-github-darker rounded-lg p-4 font-mono text-sm">
            <div className="text-github-muted text-xs mb-3">コミットのイメージ:</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-github-accent">✅</span>
                <span className="text-github-blue">[1回目]</span>
                <span className="text-github-text">資料作成開始</span>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <span className="text-github-muted">↓</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-github-accent">✅</span>
                <span className="text-github-blue">[2回目]</span>
                <span className="text-github-text">図を追加</span>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <span className="text-github-muted">↓</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-github-accent">✅</span>
                <span className="text-github-blue">[3回目]</span>
                <span className="text-github-text">誤字修正</span>
                <span className="text-github-yellow text-xs bg-github-yellow/10 px-2 py-0.5 rounded">← 今ここ</span>
              </div>
              <div className="ml-6 text-github-muted text-xs mt-2">
                （いつでもどこにでも戻れる）
              </div>
            </div>
          </div>

          <CalloutBox type="info" title="コミットメッセージのコツ">
            「何をしたか」を日本語で書きましょう。<br />
            例: 「売上データを5月分に更新」「ログインページのバグを修正」
          </CalloutBox>
        </div>
      </SectionCard>

      {/* Section 1-4 */}
      <SectionCard title="ブランチ = 作業用のコピー" emoji="🌿" delay={0.4}>
        <div className="space-y-4">
          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">ブランチ（Branch）</strong>とは、
            本番のデータを壊さずに、新機能や修正を試せる「分岐」のことです。
          </p>

          <div className="bg-github-darker rounded-lg p-4">
            <p className="text-github-muted text-sm mb-3">📄 例え話:</p>
            <p className="text-github-text text-sm leading-relaxed">
              料理のレシピを改良するとき、元のレシピはそのままにして、
              別の紙にコピーして試作するイメージです。
              試作が成功したら、元のレシピに反映（マージ）します！
            </p>
          </div>

          <div className="bg-github-darker rounded-lg p-4 font-mono text-sm">
            <div className="text-github-text">main（本番ブランチ）</div>
            <div className="text-github-accent ml-4">└─ feature/new-design（試作中）</div>
            <div className="text-github-blue ml-4">└─ fix/typo（修正中）</div>
          </div>
        </div>
      </SectionCard>

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <QuizCard
          question="Gitの「コミット」とは何をすることですか？"
          options={[
            { text: 'ファイルをGitHubにアップロードすること', correct: false },
            { text: '変更をGitに記録（セーブ）すること', correct: true },
            { text: '新しいブランチを作ること', correct: false },
            { text: 'リポジトリを作成すること', correct: false },
          ]}
          explanation="コミットとは、変更をGitに記録する行為です。ゲームのセーブポイントのようなもので、後からその時点の状態に戻ることができます。"
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
            onClick={() => navigate('/chapter/2')}
            className="bg-github-surface border border-github-border text-github-text font-semibold px-8 py-3 rounded-lg hover:bg-github-darker transition-colors"
          >
            Chapter 2へ進む →
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="bg-github-accent hover:bg-github-accentHover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ✅ Chapter 1 完了！Chapter 2へ進む →
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
