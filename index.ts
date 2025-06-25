// 生成した Prisma Client をインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // 実行されたクエリをログに表示するための設定じゃ
  log: ['query'],
});

async function main() {
  // Prisma Client を使ってデータベースに接続
  console.log("Prisma Client を初期化しました。");

  // ★ 1. ユーザーを全員取得して表示
  const usersBefore = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", usersBefore);
  
  // ★ 2. 新しいユーザーを追加
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // ★ 3. もう一度ユーザーを全員取得して表示
  const usersAfter = await prisma.user.findMany();
  console.log("After ユーザー一覧:", usersAfter);
}

// main 関数を実行する。
// 最後に必ずデータベースとの接続を切断する、大切なお作法じゃ
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });