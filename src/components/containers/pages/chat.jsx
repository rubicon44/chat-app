import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../organisms/header';

import { firebaseDb } from '../../../infra/firebase.js';

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

const Title = styled.h1`
  width: 288px;
  // 下記marginは、reset.cssでリセットする。
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  font-family: YuGothic;
`

const MessageList = styled.dl`
  > dd {
    max-width: 375px;
    height: 58px;
    margin-bottom: 2px;
    background-color: #fff;
  }
`

const chatroomsRef = firebaseDb.ref('/chat_room');
const newChatroomsRef = chatroomsRef.push();
const chatroomId = newChatroomsRef.key;
const messagesRef = firebaseDb.ref(`/chat_room/${chatroomId}`);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: [],
      chatroomId: [],
    };
  }

  componentDidMount() {
    chatroomsRef.on('value', (snapshot) => {
      // ループ処理（forEach）で上書きされないように配列を外出し
      const newData = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        newData.push(key);

        if (snapshot !== null | undefined) {
          this.setState({
            chatroomId: newData,
          });
        }
      })
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
          <Title>チャット一覧</Title>
          {this.state.chatroomId.map(chatroom =>
            <Link to={`/chatIndivisual/${chatroom}`}>
              <MessageList key={chatroom.key}>
                <dt></dt>
                <dd key={chatroom.key}>
                  <img src="" alt="props（友達の名前）" />
                  <figcaption>{chatroom}</figcaption>
                </dd>
              </MessageList>
            </Link>
          )}
        </TopBackground>
      </div>
    )
  }
}

export default Chat;