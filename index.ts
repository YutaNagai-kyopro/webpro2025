import express from 'express';
// 生成した Prisma Client をインポート
import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient({
  // クエリが実行されたときに実際に実行したクエリをログに表示する設定
  log: ['query'],
});
const app = express();

// 環境変数が設定されていれば、そこからポート番号を取得する。環境変数に設定がなければ 8888 を使用する。
const PORT = process.env.PORT || 8888;

// EJS をテンプレートエンジンとして設定するおまじない
app.set('view engine', 'ejs');
// EJS のテンプレートファイルが置いてある場所を指定する
app.set('views', './views');

// フォームから送信されたデータを受け取れるようにするためのおまじない
app.use(express.urlencoded({ extended: true }));

// ルートURL ("/") にアクセスが来たときの処理
app.get('/', async (req, res) => {
  // データベースから全てのユーザーを取得する
  const users = await prisma.user.findMany();
  // 取得したユーザー情報を 'index.ejs' というテンプレートに渡して、HTMLを生成して返す
  res.render('index', { users });
});

// "/users" というURLにフォームからデータが送信(POST)されたときの処理
app.post('/users', async (req, res) => {
  // フォームから送信された name を取得
  const name = req.body.name; 
  if (name) {
    // データベースに新しいユーザーを作成する
    const newUser = await prisma.user.create({
      data: { name },
    });
    console.log('新しいユーザーを追加しました:', newUser);
  }
  // ユーザー追加後、一覧ページ ("/") にリダイレクトする
  res.redirect('/'); 
});

// サーバーを起動する
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});