// node.jsの標準ライブラリであるhttpとurlを読み込む
import http from 'node:http';
import { URL } from 'node:url';

// 環境変数 PORT が設定されていればその値を、なければ 8888 をポートとして使用する
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストURLをパースして、パス名やクエリパラメータを取得しやすくする
  // 'http://' + req.headers.host は、完全なURL形式にするためのおまじないじゃ
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathName = requestUrl.pathname;

  console.log(`リクエストがありました: ${pathName}`);

  // レスポンスのヘッダーに、文字コードがUTF-8のHTMLであることを設定する
  // これをしないと日本語が文字化けしてしまうからの
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // URLのパスによって応答を分岐させる
  if (pathName === '/') {
    console.log('/ へのアクセスです');
    // ステータスコード200 (成功) を設定し、レスポンスを返す
    res.writeHead(200);
    res.end('こんにちは！');
  } else if (pathName === '/ask') {
    console.log('/ask へのアクセスです');
    // URLのクエリパラメータから 'q' の値を取得する
    const question = requestUrl.searchParams.get('q');
    // ステータスコード200 (成功) を設定し、レスポンスを返す
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    console.log('未定義のパスへのアクセスです');
    // どのパスにも一致しない場合は 404 Not Found を返す
    res.writeHead(404);
    res.end('ページが見つかりません');
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/ でアクセスできます。`);
});