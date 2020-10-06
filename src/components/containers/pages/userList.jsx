import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { auth } from '../../../infra/firebase.js';

import Header from '../organisms/header';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackButtonCover = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
`

const TopBackground = styled.div`
  height: 460px;
  padding: 30px 15px;
  background-color: #f8f7f3;
`

const NextChatIndivisualButton = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background-color: #ff444f;
`

const Title = styled.h1`
  width: 288px;
  // 下記marginは、reset.cssでリセットする。
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  font-family: YuGothic;
`

// Firebase Authenticationに接続して
// 登録されているユーザーを全て取得し、
// stateに保存する

// UI部分で、JSのmap関数を用いて全てのユーザーを表示。
// →その際、そのユーザー部分を押すとuser画面に飛び、
// →user画面からそのユーザーとのチャット画面に遷移できる。

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: [],
    };
  }

  componentDidMount() {
    // this.setState({
    // });
  }

  handleBackButtonClick = () => {
    this.props.history.goBack('/');
  };

  render() {
    return (
      <div>
        <Header />
        <BackButtonCover>
          <ArrowBackIosIcon onClick={this.handleBackButtonClick} />
        </BackButtonCover>
        <TopBackground>
          <Title>ユーザー一覧</Title>
            <div>
              {

              }
            </div>
        </TopBackground>
      </div>
    )
  }
}

export default User;