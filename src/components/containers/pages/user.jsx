import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../../infra/firebase.js';

import { firebaseDb } from '../../../infra/firebase.js';

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

const chatroomsRef = firebaseDb.ref('/chat_room');
const newChatroomsRef = chatroomsRef.push();
const chatroomId = newChatroomsRef.key;
const messagesRef = firebaseDb.ref(`/chat_room/${chatroomId}`);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: [],
      uid: [],
      chatroomId: [],
    };
  }

  componentDidMount() {
    // ユーザー情報取得
    const uid = auth.currentUser;
    const email = uid.email;

    this.setState({
      email: email,
      uid: uid,
    });

    // データ取得
    messagesRef.on('value', (snapshot) => {
      const key = snapshot.key;
      if (key !== null) {
        this.setState({
          chatroomId: key,
        });
      }
    })
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
          <div>
            <NextChatIndivisualButton to={`/chatIndivisual/${this.state.chatroomId}`}>チャット</NextChatIndivisualButton>
          </div>
          <Title>ユーザー詳細</Title>
            <div>{this.state.email}</div>
        </TopBackground>
      </div>
    )
  }
}

export default User;