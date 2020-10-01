import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  // Switch,
} from 'react-router-dom';

import { auth } from '../infra/firebase.js';

export default function LineLink() {
    // 再ログインを求める（サインアウト）
    auth.signOut();

    // ログイン後にnonceを生成するURLへリダイレクトさせるため、returnURLを設定（URLにリクエストパラメータとして「?returnUrl={returnUrl}」を設定する）
    const linkToken = window.location.search.substring(1);
    // const returnUrl = "https://chat-app-3519b.web.app/lineLinkEx?" + linkToken;
    // const returnUrl = "http://localhost:3000/lineLinkEx?" + linkToken;

    // ログイン画面へリダイレクト　　　　→ログインに成功すると、nonceを生成してLINEぷらっとフォームにリダイレクト（nonceはFirebase Firestoreに保存）
    // window.location = "https://chat-app-3519b.web.app/sign_in?returnUrl=" + returnUrl;
    // window.location = "https://chat-app-3519b.web.app/sign_in?" + linkToken;
    window.location = "http://localhost:3000/sign_in?" + linkToken;
    // window.location = "http://localhost:3000/sign_in?returnUrl=" + returnUrl;

    console.log("id連携前準備");
    return (<div>id連携前準備</div>);
};

// export default function LineLink() {
//     // 「/lineLink」にアクセスされたら、ログインを求める

//     // ログインが完了したら、Firebaseにアクセスしuidを取得/nonceを生成→Firebase Firestoreに保存

//     // 上記処理が完了したら、LINEプラットフォームにリダイレクトする（https://access.line.me/dialog/bot/accountLink?linkToken={link token}&nonce={nonce}）→おそらくここにリダイレクトするとこで、Webhookで紐づけているLINE BOTへWebhookイベントが渡るので、LINE BOTの方に「アカウント連携イベントを受信したら、連携処理を実行」する処理を書いておく。

//     return (null);
// };