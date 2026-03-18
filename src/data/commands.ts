export interface CommandData {
  command: string
  meaning: string
  emoji: string
  description: string
  usage: string
  ngExample: string
  ngReason: string
}

export const COMMANDS: CommandData[] = [
  {
    command: 'git clone',
    meaning: 'リポジトリをコピーする',
    emoji: '📥',
    description: 'GitHubにあるリポジトリを自分のパソコンにコピーします。最初の1回だけ実行します。',
    usage: `git clone https://github.com/yourname/your-repo.git`,
    ngExample: 'git clone',
    ngReason: 'URLを指定しないとエラーになります。必ずリポジトリのURLを続けて入力してください。',
  },
  {
    command: 'git status',
    meaning: '現在の状態を確認する',
    emoji: '🔍',
    description: 'どのファイルが変更されているか、コミット待ちのファイルはあるかを確認します。迷ったらまずこれ！',
    usage: `git status`,
    ngExample: 'git status -all',
    ngReason: '`-all` というオプションは存在しません。単純に `git status` と入力するだけでOKです。',
  },
  {
    command: 'git add',
    meaning: '変更を登録する（コミットの準備）',
    emoji: '➕',
    description: 'コミット（セーブ）したいファイルを選んで登録します。「ステージング」とも呼ばれます。',
    usage: `# 全ての変更をまとめて登録
git add .

# 特定のファイルだけ登録
git add index.html`,
    ngExample: 'git commit -m "更新"（addなしで）',
    ngReason: 'git addをせずにcommitしても、変更が含まれません。必ずaddしてからcommitしましょう。',
  },
  {
    command: 'git commit',
    meaning: 'セーブする',
    emoji: '💾',
    description: '登録した変更をGitに記録します。メッセージには「何をしたか」を日本語で書きましょう。',
    usage: `git commit -m "売上データを5月分に更新"`,
    ngExample: 'git commit -m "update"',
    ngReason: '何を更新したかわからないメッセージは避けましょう。後から見ても分かる説明を書くのがベストプラクティスです。',
  },
  {
    command: 'git push',
    meaning: 'GitHubにアップロードする',
    emoji: '⬆️',
    description: 'ローカルのコミットをGitHubにアップロードします。チームと共有するための大事な一歩！',
    usage: `# 基本的な使い方
git push origin main

# 新しいブランチを初めてpushする場合
git push -u origin feature/new-design`,
    ngExample: 'git push（-u なしで新規ブランチ）',
    ngReason: '新しいブランチを初めてpushするときは `-u origin ブランチ名` が必要です。',
  },
  {
    command: 'git pull',
    meaning: 'GitHubから最新版をダウンロードする',
    emoji: '⬇️',
    description: 'チームメンバーが加えた変更を自分のパソコンに取り込みます。作業前に必ず実行しましょう！',
    usage: `git pull origin main`,
    ngExample: 'git pull（作業を始める前にやらない）',
    ngReason: '最新版を取り込まずに作業すると、後でコンフリクト（競合）が起きやすくなります。',
  },
  {
    command: 'git branch',
    meaning: 'ブランチを確認・作成する',
    emoji: '🌿',
    description: 'ブランチの一覧を表示したり、新しいブランチを作成します。',
    usage: `# ブランチ一覧を表示
git branch

# 新しいブランチを作成
git branch feature/new-design`,
    ngExample: 'git branch feature new-design',
    ngReason: 'ブランチ名にスペースは使えません。`/` や `-` で区切りましょう。例: `feature/new-design`',
  },
  {
    command: 'git checkout / git switch',
    meaning: 'ブランチを切り替える',
    emoji: '🔀',
    description: '別のブランチに移動します。新しいGitでは `git switch` が推奨されています。',
    usage: `# ブランチを切り替える（新しい書き方）
git switch feature/new-design

# ブランチを作りながら切り替える
git switch -c feature/new-design

# 従来の書き方（どちらでも動きます）
git checkout feature/new-design
git checkout -b feature/new-design`,
    ngExample: 'git checkout feature/new-design（存在しないブランチ）',
    ngReason: '切り替え先のブランチが存在しないとエラーになります。新規作成の場合は `-b`（または `-c`）オプションが必要です。',
  },
]
