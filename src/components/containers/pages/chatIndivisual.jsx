import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';

import { firebaseDb } from '../../../infra/firebase.js'

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
const messagesRef = firebaseDb.ref('/chat');

class ChatIndivisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      message: '',
    };
  }

  // Viewが一番最初に描画されるとき、Firebase Realtime Databaseに保持されているtext（チャット内容）をReactで表示させる
  componentDidMount() {
    // Firebase Realtime Databaseの内容が変更されたときの処理
    messagesRef.on('child_added', (snapshot) => {
      // 現在のFirebase Realtime Databaseの内容を変数mに代入
      const m = snapshot.val()

      // 現在のFirebase Realtime Databaseの内容で、stateを更新
      this.setState({
        text : m
      });

      // console.log(this.state.text);
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

    const elementBottom = document.getElementById('messageListCover').clientHeight;
    window.scroll(0, elementBottom);
  }

  // input内のvalueに入力した値を反映させる
  handleMessageChange = (e) => {
    e.preventDefault();
    this.setState({ 
        message: e.target.value,
    });

    const bottomBarHeight = 50;
    const textAreaHeight = document.getElementById('bottomBarVariableHeight').clientHeight;
    const variableMessageListPaddingBottom = textAreaHeight - bottomBarHeight;
    document.getElementById('messageListCover').style.paddingBottom = variableMessageListPaddingBottom + "px";
  };

  // textメッセージにmessageの値を挿入し、messageの値を空に上書きしinputを空にする
  handleMessageSend = (e) => {
    e.preventDefault();

    const newData = update(this.state.text, {$push: [this.state.message]});
    this.setState({ 
        text: newData,
        message: '',
    }, () => {
      // このように「setStateのコールバック」を使用しないと、即座にstateにnewDataを反映させることができない。
      // handleMessageSend()でセットされたtext（state内に一時的に保持）を即座にFirebase Realtime Databaseにpushする。
      messagesRef.set({
        "text" : this.state.text,
      });
    });

    document.getElementById('messageListCover').style.paddingBottom =  "0";
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
          <BottomChatBar text={this.state.text} message={this.state.message} messageChangeMethod={this.handleMessageChange} messageSendMethod={this.handleMessageSend} />
        </TopBackground>
      </div>
    )
  }
}

export default ChatIndivisual;