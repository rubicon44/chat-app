import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../infra/firebase.js';

// contextの作成
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // ユーザーをログインさせる関数
  const signin = async (email, password, history) => {
    try {
      // awaitをつけないと、先に「history.push」が実行されてしまいログイン画面（/）にページ遷移してしまう。
      await auth.signInWithEmailAndPassword(email, password);

      // LINE id連携用（URLにreturnURLが含まれていた場合リダイレクト先を変更）
      const urlCheck = window.location.search.substring(1);

      // 含まれている場合は「0」、含まれていない場合は「-1」が格納される。
      const urlCheckResult = urlCheck.includes(' ');
      const linkToken = window.location.search.substring(1);

      // ユーザー情報取得
      const user = auth.currentUser;
      const userId = user.uid;
      // 下記emailを取得しようとすると「ReferenceError: Cannot access 'email' before initialization（ReferenceError:初期化の前に「電子メール 」にアクセスできません）」とエラーが出現
      // const email = user.getEmail();
      // console.log(email);
      // console.log(userId);

      console.log(urlCheckResult);

      if(urlCheckResult === true) {
        history.push("/");
      } else {
        history.push({
          pathname: "/lineLinkEx?" + linkToken,
          state: {userId}
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  // コンテキスト用のログアウト方法
  const signout = async () => {
    await auth.signOut()
  }

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={{ currentUser, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};