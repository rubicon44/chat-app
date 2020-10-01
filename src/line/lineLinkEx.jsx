import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  // Switch,
} from 'react-router-dom';

import { auth } from '../infra/firebase.js';
// import * as admin from 'firebase-admin';

// Firebase Authenticationからログインしているユーザー情報を取得
// const user = auth.currentUser;
// const userId = user.uid;


// admin.auth().getUserByEmail().then(function(userRecord) {
//     const uid = user.uid;
//     console.log(uid);
// });

export default function LineLinkEx(props) {
    // linkTokenの取得（LINE BOTが最初に取得した情報）
    const linkToken = window.location.search.substring(1);

    // 「nonce」の生成
    const nonce = Math.random().toString(32).substring(2);

    // ユーザーID取得（Firebase Authentication）
    // →ここで、自社サービスに現在ログインしているユーザーのuid（Firebase Authentication）が取得できる。
    const uid = props.location.state.userId;

    // ユーザーIDとNonceをDBに保存（Firebase Firestore）
    // nonceがキー、uidがバリューのペアで保存。
    // todo：DB設計（Firebase Firestore）が必要？？

    // 生成したnonceを付けてLINEサーバーにリダイレクト（window.location = "https://access.line.me/dialog/bot/accountLink?linkToken=" + linkToken + "&nonce=" + nonce）
    // このURLにリクエストを送るとid連携ができる。






    // const urlCheck = window.location.search.substring(1);
    // console.log(urlCheck);

    // console.log("id連携実行" + props.location.state.userId);
    return (
      <div>id連携実行
          {nonce}
          {uid}
          {/* {props.location.state.userId} */}
          </div>
    );
};