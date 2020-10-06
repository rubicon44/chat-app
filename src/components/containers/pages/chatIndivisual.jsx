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

// Firebase Realtime Databaseとの通信用
const messagesRef = firebaseDb.ref('/chat_room');

class ChatIndivisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      message: '',
      userId: [],
      // user: [],
    };
  }

  // Viewが一番最初に描画されるとき、Firebase Realtime Databaseに保持されているtext（チャット内容）をReactで表示させる
  componentDidMount() {
    // Firebase Realtime Databaseの内容が変更されたときの処理

    // todo:一度「child_added」でメッセージを送信した後、「value」で値を取得する
    messagesRef.on('child_added', (snapshot) => {
    // 「　messagesRef.on('child_added', (snapshot) => {　」と「child_added」だと、1つ目の「text」しか取得できなかった。
      // 現在のFirebase Realtime Databaseの内容を変数mに代入
      const m = snapshot.val();
      // console.log(m);
      // const m1 = m.text.text
      // ここで、一意のキーを取得できる。
      // const key = snapshot.key;
      // console.log(key);
      // const texts = this.state.text;

      // texts.push({
      //   ''
      // })

      // 現在のFirebase Realtime Databaseの内容で、stateを更新
      this.setState({
        text : m.text,
        userId: m.userId,
        // user: m.user,
      });
      // console.log(this.state.user);
    })
  };

  handleBackButtonClick = () => {
    this.props.history.goBack('/chat');
  };

  // 描画されてから処理を実行。
  componentDidUpdate() {
    // handleMessageSend()でセットされたtext（state内に一時的に保持）を即座にFirebase Realtime Databaseにpushする。
    // messagesRef.push({
    //   "text" : this.state.text,
    // })

    // const elementBottom = document.getElementById('messageListCover').clientHeight;
    // window.scroll(0, elementBottom);
  }

  // input内のvalueに入力した値を反映させる
  handleMessageChange = (e) => {
    e.preventDefault();
    this.setState({ 
        message: e.target.value,
    });

    // const bottomBarHeight = 50;
    // const textAreaHeight = document.getElementById('bottomBarVariableHeight').clientHeight;
    // const variableMessageListPaddingBottom = textAreaHeight - bottomBarHeight;
    // document.getElementById('messageListCover').style.paddingBottom = variableMessageListPaddingBottom + "px";
  };

  // textメッセージにmessageの値を挿入し、messageの値を空に上書きしinputを空にする
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
      // このように「setStateのコールバック」を使用しないと、即座にstateにnewDataを反映させることができない。
      // handleMessageSend()でセットされたtext（state内に一時的に保持）を即座にFirebase Realtime Databaseにpushする。
      messagesRef.push({
        // "userId": this.state.userId,
        "userId": this.state.userId,
        "text": this.state.text,
      });

      // 子要素に挿入
      // var userIdRef = firebaseDb.ref("/userId");

      // userIdRef.set({
      //   "text" : this.state.text,
      // });
    });

    // document.getElementById('messageListCover').style.paddingBottom = "0";
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
                  {/* 下記で、text,message等のstateをpropsとして子コンポーネントに渡さなければ、input内を空にしたりできない。 */}
          {/* {this.state.text.map((text,message, i) => {
            return <BottomChatBar key={i} text={text} message={message} messageChangeMethod={this.handleMessageChange} messageSendMethod={this.handleMessageSend} />
          })} */}
          <BottomChatBar userId={this.state.userId} text={this.state.text} message={this.state.message} messageChangeMethod={this.handleMessageChange} messageSendMethod={this.handleMessageSend} />
        </TopBackground>
      </div>
    )
  }
}

export default ChatIndivisual;