export interface Exercise {
  id: string
  title: string
  description: string
  hint: string
  expectedCommands: string[]
  successMessage: string
  successOutput: string
}

/** エンジニア向けハンズオン（Claude Code × GitHub）用の演習定義 */
export interface EngineerExercise {
  id: string
  step: number
  title: string
  description: string
  content: string
  /** true の場合はターミナルなし・説明カードのみ表示 */
  isInfo?: boolean
  icon: string
  /** ターミナルに入力するコマンド例 */
  simulatorCommand?: string
  expectedCommands?: string[]
  successOutput?: string
  successMessage?: string
  hint?: string
}

export const EXERCISES: Exercise[] = [
  {
    id: 'clone',
    title: '演習1: リポジトリをcloneしよう',
    description: 'サンプルリポジトリをあなたのパソコンにコピーしてみましょう。',
    hint: '`git clone` に続けてURLを入力します。例: git clone https://github.com/example/repo.git',
    expectedCommands: ['git clone'],
    successMessage: '🎉 完璧！リポジトリがコピーされました！',
    successOutput: `Cloning into 'sample-project'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (8/8), done.
Receiving objects: 100% (10/10), 2.34 KiB | 2.34 MiB/s, done.`,
  },
  {
    id: 'add',
    title: '演習2: ファイルをステージングしよう',
    description: 'ファイルに変更を加えた後、コミットの準備をしましょう。',
    hint: '`git add .` で全ての変更をまとめて登録できます。',
    expectedCommands: ['git add'],
    successMessage: '✅ ファイルがステージングされました！次は git commit でセーブしましょう。',
    successOutput: `（変更が登録されました）
次のステップ: git commit -m "メッセージ"`,
  },
  {
    id: 'commit',
    title: '演習3: コミット（セーブ）しよう',
    description: 'ステージングした変更をコミットしてGitに記録しましょう。',
    hint: '`git commit -m "メッセージ"` でコミットします。メッセージには変更内容を書きましょう。',
    expectedCommands: ['git commit'],
    successMessage: '💾 コミット完了！変更がGitに記録されました！',
    successOutput: `[main a1b2c3d] はじめてのコミット
 1 file changed, 5 insertions(+)
 create mode 100644 README.md`,
  },
  {
    id: 'branch',
    title: '演習4: ブランチを作ろう',
    description: '新しいブランチを作成してそこへ移動しましょう。',
    hint: '`git checkout -b ブランチ名` または `git switch -c ブランチ名` で新しいブランチを作れます。',
    expectedCommands: ['git checkout -b', 'git switch -c'],
    successMessage: '🌿 新しいブランチが作成されました！安全に作業できます。',
    successOutput: `Switched to a new branch 'feature/my-branch'
（mainブランチに影響なく、新しい作業を始められます）`,
  },
  {
    id: 'push',
    title: '演習5: GitHubにプッシュしよう',
    description: 'コミットした変更をGitHubにアップロードしましょう。',
    hint: '`git push origin ブランチ名` でアップロードします。',
    expectedCommands: ['git push'],
    successMessage: '🚀 プッシュ完了！GitHubにアップロードされました！',
    successOutput: `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 285 bytes | 285.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/yourname/sample-project.git
 * [new branch]      feature/my-branch -> feature/my-branch`,
  },
]

/** Claude Code × GitHub エンジニア向けハンズオン演習 */
export const ENGINEER_EXERCISES: EngineerExercise[] = [
  {
    id: 'eng_open',
    step: 1,
    title: 'STEP 1: Claude Code を起動する',
    description: 'まずは Claude Code デスクトップアプリを起動して、プロジェクトフォルダを開きましょう。',
    content: `【Claude Code とは？】
Anthropic が開発したAIコーディングアシスタントです。
会話するだけで、コードを書いたり、GitHubの操作をしてくれます。

【インストール】
1. https://claude.ai/download からダウンロード
2. インストール後、ターミナルで「claude」コマンドが使えるようになります

【起動方法】
① プロジェクトフォルダをターミナルで開く
② 「claude」と入力して起動`,
    // この演習はシミュレーターではなく説明カード
    isInfo: true,
    icon: '💻',
  },
  {
    id: 'eng_clone',
    step: 2,
    title: 'STEP 2: リポジトリを clone してもらう',
    description: 'Claude Code に話しかけるだけでリポジトリをcloneできます。',
    content: `【Claude Code への指示例】
「このリポジトリをcloneして: https://github.com/yurulica-com/sample」

【Claude Code がやってくれること】
✅ git clone コマンドを実行
✅ フォルダを作成
✅ 完了を報告

ポイント: コマンドを覚えなくても、
日本語で話しかけるだけでOKです！`,
    simulatorCommand: 'git clone https://github.com/example/sample',
    expectedCommands: ['git clone'],
    successOutput: `Cloning into 'sample'...
remote: Enumerating objects: 42, done.
remote: Counting objects: 100% (42/42), done.
Receiving objects: 100% (42/42), 125.34 KiB | done.
✨ Claude: クローン完了しました！`,
    successMessage: '✅ STEP 2 完了！リポジトリをcloneできました',
    hint: '`git clone` に続けてURLを入力します。例: git clone https://github.com/example/sample',
    icon: '📦',
  },
  {
    id: 'eng_branch',
    step: 3,
    title: 'STEP 3: ブランチを作ってもらう',
    description: '新機能の開発を始めるとき、まずブランチを作ります。Claude Codeに作ってもらいましょう。',
    content: `【Claude Code への指示例】
「feature/add-login という名前のブランチを作って切り替えて」

【Claude Code がやってくれること】
✅ git checkout -b feature/add-login を実行
✅ ブランチが切り替わったことを確認
✅ 現在のブランチ状態を報告`,
    simulatorCommand: 'git checkout -b feature/add-login',
    expectedCommands: ['git checkout -b', 'git switch -c'],
    successOutput: `Switched to a new branch 'feature/add-login'
✨ Claude: ブランチ「feature/add-login」を作成して切り替えました！
現在のブランチ: feature/add-login`,
    successMessage: '✅ STEP 3 完了！ブランチを作成できました',
    hint: '`git checkout -b ブランチ名` でブランチを作成できます。例: git checkout -b feature/add-login',
    icon: '🌿',
  },
  {
    id: 'eng_commit',
    step: 4,
    title: 'STEP 4: 変更をコミットしてもらう',
    description: 'ファイルを変更したら、Claude Codeにコミットしてもらいましょう。',
    content: `【Claude Code への指示例】
「今の変更をコミットして。メッセージは「ログイン機能を追加」で」

【Claude Code がやってくれること】
✅ git add . を実行
✅ 指定したメッセージでgit commitを実行
✅ コミット完了を報告

ポイント: コミットメッセージも
日本語で指定できます！`,
    simulatorCommand: 'git commit -m "ログイン機能を追加"',
    expectedCommands: ['git commit'],
    successOutput: `[feature/add-login a3f92c1] ログイン機能を追加
 3 files changed, 87 insertions(+), 2 deletions(-)
✨ Claude: コミットしました！変更が記録されました`,
    successMessage: '✅ STEP 4 完了！変更をコミットできました',
    hint: '`git commit -m "メッセージ"` でコミットします。例: git commit -m "ログイン機能を追加"',
    icon: '💾',
  },
  {
    id: 'eng_pr',
    step: 5,
    title: 'STEP 5: プッシュしてPRを作ってもらう',
    description: 'GitHubにアップロードして、チームへのレビュー依頼（プルリクエスト）を作成します。',
    content: `【Claude Code への指示例】
「GitHubにプッシュして、PRを作って。タイトルは「ログイン機能の追加」で」

【Claude Code がやってくれること】
✅ git push origin feature/add-login を実行
✅ GitHub CLIでPRを作成（gh pr create）
✅ PRのURLを報告

完了後、GitHubを開いてPRを確認してみよう！
チームメンバーがレビューできるようになっています。`,
    simulatorCommand: 'git push origin feature/add-login',
    expectedCommands: ['git push'],
    successOutput: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
To github.com:example/sample.git
 * [new branch]  feature/add-login -> feature/add-login
✨ Claude: プッシュ完了！PRを作成しました
🔗 PR URL: https://github.com/example/sample/pull/1`,
    successMessage: '🎉 全STEP完了！Claude Code × GitHubのワークフローをマスターしました！',
    hint: '`git push origin ブランチ名` でプッシュします。例: git push origin feature/add-login',
    icon: '🚀',
  },
]
