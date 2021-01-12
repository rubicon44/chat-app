import React, { Component } from 'react';
// import { Link, } from 'react-router-dom';
import styled from 'styled-components';

import { auth } from '../infra/firebase.js';

import Header from '../components/containers/organisms/header';
import NextSignInButton from '../components/presentational/atoms/nextSignInButton';
import NextSignUpButton from '../components/presentational/atoms/nextSignUpButton';
import LogOutButton from '../components/presentational/atoms/logOutButton';

import NextChatButton from '../components/presentational/atoms/nextChatButton';
import NextToDoButton from '../components/presentational/atoms/nextToDoButton';

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

const ButtonGroupCover = styled.div`
  > a:not(:first-of-type) {
    margin-top: 15px;
  }
`

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    const user_id = user.uid;

    this.setState({
      uid: user_id,
    });
  }
  // uidを表示させ、uidをクリックすると、User詳細画面へ遷移する
  handleUidClick = () => {
    this.props.history.push('/user');
  }

  render() {
    return (
      <div>
        <Header />
        <NextSignInUpButtonCover>
          <NextSignInButton text="ログイン" />
          <NextSignUpButton text="会員登録" />
          <LogOutButton text="ログアウト" />
          <div onClick={this.handleUidClick}>{this.state.uid}</div>
        </NextSignInUpButtonCover>
        <TopBackground>
          <Title>Chap-app</Title>
          {/* 下記で「ゲストログイン」ができるようにする。 */}
          <ButtonGroupCover>
            <NextChatButton text="チャットをする" />
            <NextToDoButton text="ToDoを管理する" />
          </ButtonGroupCover>
        </TopBackground>
      </div>
    )
  }
}

export default Top;