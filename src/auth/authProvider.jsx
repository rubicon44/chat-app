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
      history.push("/");
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

  const signout = async () => {
    await auth.signOut()
  }

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={{ currentUser, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};