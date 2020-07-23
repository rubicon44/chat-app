import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';

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

class ChatIndivisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      message: '',
    };
  }

  handleBackButtonClick = () => {
    this.props.history.goBack('/chat');
  };

  // 描画されてから処理を実行。
  componentDidUpdate() {
    const elementBottom = document.getElementById('messageListCover').clientHeight;
    window.scroll(0, elementBottom);
  }

  // input無いのvalueに入力した値を反映させる
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
  handleMessageSend = (state) => {
    const newData = update(this.state.text, {$push:[this.state.message]});
    this.setState({ 
        text: newData,
        message: '',
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