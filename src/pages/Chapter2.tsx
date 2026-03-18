import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../components/chapter/SectionCard'
import { CalloutBox } from '../components/ui/CalloutBox'
import { QuizCard } from '../components/chapter/QuizCard'
import { useProgress } from '../hooks/useProgress'

export function Chapter2() {
  const navigate = useNavigate()
  const { completeChapter, isChapterCompleted } = useProgress()
  const isDone = isChapterCompleted(2)

  const handleComplete = () => {
    completeChapter(2)
    navigate('/chapter/3')
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
        <div className="text-github-muted text-sm mb-2">Chapter 2</div>
        <h1 className="text-3xl font-bold text-github-text flex items-center gap-3">
          <span className="text-4xl">🐙</span>
          GitHubとは？
        </h1>
        <p className="text-github-muted mt-2">
          GitHubをGoogle Driveと比較しながら理解しよう
        </p>
      </div>

      {/* Section 2-1 */}
      <SectionCard title="GitHub = Gitのデータをクラウドに保存する場所" emoji="☁️" delay={0.1}>
        <div className="space-y-4">
          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">GitHub</strong>とは、
            Gitで管理しているファイルをインターネット上に保存・共有できるサービスです。
            あなたのパソコンにあるGitリポジトリを、クラウドにアップロードして
            チームと共有できます。
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-github-darker">
                  <th className="border border-github-border px-4 py-2 text-left text-github-muted">比較項目</th>
                  <th className="border border-github-border px-4 py-2 text-github-blue">Google Drive</th>
                  <th className="border border-github-border px-4 py-2 text-github-accent">GitHub</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: '何を保存？', drive: '何でも', github: 'コード・文書', githubBetter: false },
                  { item: '変更履歴', drive: '△ 簡易的', github: '◎ 詳細', githubBetter: true },
                  { item: 'チーム作業', drive: '○', github: '◎', githubBetter: true },
                  { item: '無料枠', drive: '15GB', github: '容量無制限*', githubBetter: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-github-darker/50">
                    <td className="border border-github-border px-4 py-2 text-github-muted">{row.item}</td>
                    <td className="border border-github-border px-4 py-2 text-github-text text-center">{row.drive}</td>
                    <td className={`border border-github-border px-4 py-2 text-center font-semibold ${row.githubBetter ? 'text-github-accent' : 'text-github-text'}`}>
                      {row.github}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-github-muted text-xs">*パブリックリポジトリは容量制限なし</p>

          <div className="space-y-2">
            <p className="text-github-text font-semibold">GitHubを使うと：</p>
            {[
              'どこからでもアクセスできる',
              'チームで同じファイルを編集できる',
              '「誰が・いつ・何を変えたか」がわかる',
              '間違えても元に戻せる',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-github-text">
                <span className="text-github-accent">✅</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Section 2-2 */}
      <SectionCard title="プルリクエスト = 変更内容のレビュー依頼" emoji="📝" delay={0.2}>
        <div className="space-y-4">
          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">プルリクエスト（Pull Request / PR）</strong>とは、
            ブランチで作業した変更を「確認してください」と申請する仕組みです。
            チームの校閲・レビュー作業のようなものです。
          </p>

          <div className="bg-github-darker rounded-lg p-4">
            <p className="text-github-muted text-sm mb-3 font-semibold">チームでの作業フロー：</p>
            <div className="space-y-2">
              {[
                { step: 1, text: 'ブランチで作業する', emoji: '🌿' },
                { step: 2, text: '変更をGitHubにアップロード（プッシュ）', emoji: '⬆️' },
                { step: 3, text: '「確認してください」と申請（プルリクエスト）', emoji: '📬' },
                { step: 4, text: 'チームがレビュー・コメント', emoji: '👀' },
                { step: 5, text: 'OKなら本番に反映（マージ）', emoji: '✅' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-github-blue/20 text-github-blue text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <span className="text-github-text text-sm">{item.emoji} {item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <CalloutBox type="tip" title="プルリクエストのメリット">
            直接本番に変更を加える前に、チームのチェックが入るので安心です。
            コメントで改善案をやり取りすることもできます！
          </CalloutBox>
        </div>
      </SectionCard>

      {/* Section 2-3 */}
      <SectionCard title="イシュー = タスク管理・メモ" emoji="📌" delay={0.3}>
        <div className="space-y-4">
          <p className="text-github-text leading-relaxed">
            <strong className="text-github-blue">イシュー（Issue）</strong>とは、
            バグ報告や改善提案を記録する場所です。
            TrelloやNotionのようなタスク管理ツールに似ています。
          </p>

          <div className="space-y-3">
            <p className="text-github-muted text-sm font-semibold">使い方の例：</p>
            {[
              { type: 'バグ報告', icon: '🐛', text: 'ログインページのボタンの色がおかしい', color: 'border-github-red text-github-red' },
              { type: '改善提案', icon: '💡', text: 'ダークモードを追加したい', color: 'border-github-blue text-github-blue' },
              { type: 'タスク', icon: '📋', text: '5月末までにAPI修正', color: 'border-github-yellow text-github-yellow' },
            ].map((item, idx) => (
              <div key={idx} className={`border rounded-lg p-3 bg-github-darker`}>
                <div className={`text-xs font-semibold mb-1 ${item.color}`}>
                  {item.icon} {item.type}
                </div>
                <p className="text-github-text text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <QuizCard
          question="プルリクエストの目的として正しいものはどれですか？"
          options={[
            { text: 'ファイルをダウンロードすること', correct: false },
            { text: '変更内容をチームにレビューしてもらうこと', correct: true },
            { text: '新しいリポジトリを作成すること', correct: false },
            { text: 'ブランチを削除すること', correct: false },
          ]}
          explanation="プルリクエストは、ブランチで行った変更をチームにレビュー・確認してもらうための仕組みです。承認されると本番ブランチにマージ（反映）されます。"
        />
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
            onClick={() => navigate('/chapter/3')}
            className="bg-github-surface border border-github-border text-github-text font-semibold px-8 py-3 rounded-lg hover:bg-github-darker transition-colors"
          >
            Chapter 3へ進む →
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="bg-github-accent hover:bg-github-accentHover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            ✅ Chapter 2 完了！Chapter 3へ進む →
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
