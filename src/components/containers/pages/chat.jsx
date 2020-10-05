import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../organisms/header';

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

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: [],
    };
  }

  handleMessageClick = () => {
    // :todo「/woman/[props.woman.name]というように値を渡さなければいけない。」
    this.props.history.push('/chatIndivisual');
  }

  render() {
    return (
      <div>
        <Header />
        <TopBackground>
          <Title>チャット一覧</Title>
          <MessageList>
            {/* ユーザーずつのチャットルームを作る */}
            {/* map関数で、ユーザーごとのchatIndivisual.jsxを展開 */}
            {/* 「ユーザー詳細画面」の「個別チャット」ボタンを押下し、メッセージを送る。（「ユーザー詳細画面」の「個別チャット」ボタンを押下したら、トークルームに移動する。DBにメッセージが追加されたことをトリガーとして、CloudFunctionsが動き、トークルームを作る。） */}
            {/* メッセージが追加されたら、送信者・受信者のトークルームを作成 */}

              <dt></dt>
              <dd onClick={this.handleMessageClick}>
                <img src="" alt="props（友達の名前）" />
                <figcaption>props（友達の名前）</figcaption>
              </dd>
          </MessageList>
        </TopBackground>
      </div>
    )
  }
}

export default Chat;