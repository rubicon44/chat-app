import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';

import { firebaseDb } from '../../../infra/firebase.js'
import { auth } from '../../../infra/firebase.js';

import Header from '../organisms/header';
import BottomChatBar from '../organisms/bottomChatBar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// 文字入力の上がり幅が1列につき18pxのため、50px（bottomBar） + 18px（1列の上がり幅） = 68ox。
var variableMessageListPaddingBottom = '68px';

const TopBackground = styled.div`
  // bottomBarに高さを合わせるため。
  position: relative;
  padding: 30px 15px ${variableMessageListPaddingBottom};
  background-color: #f8f7f3;
`

const BackButtonCover = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
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
// 新しいチャットルームIDの作成
const newChatroomsRef = chatroomsRef.push();
const chatroomId = newChatroomsRef.key;
const messagesRef = firebaseDb.ref(`/chat_room/${chatroomId}`);

class ChatIndivisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      message: '',
      userId: [],
      chatroomId: '',
      chatroomIdList: [],
    };
  }

  componentDidMount() {
    // URLから末尾の「チャットルームID」取得 & Ref作成（データ取得の準備）
    const url = window.location.href.split("/");
    const lastUrl = url[url.length -1];
    const currentChatRoomRef = firebaseDb.ref(`/chat_room/${lastUrl}`);

    currentChatRoomRef.on('value', (snapshot) => {
      const m = snapshot.val();

      if (m !== null | undefined) {
        this.setState({
          text : m.text,
          userId: m.userId,
          chatroomId: lastUrl,
        });
      } else {
        // nullだった場合、新しい「chatroomId」でチャットルームを作成
        this.setState({
          chatroomId: lastUrl,
        });
      }
    })
  };

  handleBackButtonClick = () => {
    this.props.history.goBack('/chat');
  };

  handleMessageChange = (e) => {
    e.preventDefault();
    this.setState({ 
        message: e.target.value,
    });
  };

  handleMessageSend = (e) => {
    e.preventDefault();

    // userId登録
    const user = auth.currentUser;
    const userId = user.uid;
    const newUser = update(this.state.userId, {$push: [userId]});

    // message登録
    const newData = update(this.state.text, {$push: [this.state.message]});
    
    this.setState({
        text: newData,
        message: '',
        userId: newUser,
    }, () => {
      // 既存チャットルームの有無を判別
      chatroomsRef.on('value', (snapshot) => {
        const newData = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          newData.push(key);
  
          if (snapshot !== null | undefined) {
            this.setState({
              chatroomIdList: newData,
            });
          }
        })
      })

      // 既存チャットルーム更新 & 新しいキーで新しいチャットルーム作成
      const currentChatRoomRef = firebaseDb.ref(`/chat_room/${this.state.chatroomId}`);
      currentChatRoomRef.update({
        "text": this.state.text,
        "userId": this.state.userId,
      });
    });
  };

  render() {
    return (
      <div>
        <Header />
        <TopBackground>
          <BackButtonCover>
            <ArrowBackIosIcon onClick={this.handleBackButtonClick} />
          </BackButtonCover>
          <Title>props.friendname</Title>
          <BottomChatBar userId={this.state.userId} text={this.state.text} message={this.state.message} messageChangeMethod={this.handleMessageChange} messageSendMethod={this.handleMessageSend} />
        </TopBackground>
      </div>
    )
  }
}

export default ChatIndivisual;