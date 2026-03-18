export interface Exercise {
  id: string
  title: string
  description: string
  hint: string
  expectedCommands: string[]
  successMessage: string
  successOutput: string
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
