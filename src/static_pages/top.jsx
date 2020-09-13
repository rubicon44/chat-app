import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/containers/organisms/header';
import NextSignInButton from '../components/presentational/atoms/nextSignInButton';
import NextSignUpButton from '../components/presentational/atoms/nextSignUpButton';
import NextChatButton from '../components/presentational/atoms/nextChatButton';

const TopBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 460px;
  text-align: center;
  background-color: #ddd;
`

const Title = styled.h1`
  width: 288px;
  color: #ff444f;
  font-size: 36px;
  font-family: YuMincho;
`

const NextSignInUpButtonCover = styled.div`
  display: flex;
  justify-content: flex-end;

  // todo:子要素にそのままmarginを当てたくないため、「親要素Coverの子要素のaタグ」へのスタイリング指定を行う。
  > a:first-of-type {
    margin-right: 10px;
  }
`

class Top extends Component {
  render() {
    return (
      <div>
        <Header />
        <NextSignInUpButtonCover>
          <NextSignInButton text="ログイン" />
          <NextSignUpButton text="会員登録" />
        </NextSignInUpButtonCover>
        <TopBackground>
          <Title>Chap-app</Title>
          {/* 下記で「ゲストログイン」ができるようにする。 */}
          <NextChatButton text="さっそく使ってみる" />
        </TopBackground>
      </div>
    )
  }
}

export default Top;