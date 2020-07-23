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
              <dt></dt>
              <dd onClick={this.handleMessageClick}>
                <img src="" alt="props（友達の名前）" />
                <figcaption>props（友達の名前）</figcaption>
              </dd>
              <dd>
                <img src="" alt="props（友達の名前）" />
                <figcaption>props（友達の名前）</figcaption>
              </dd>
              <dd>
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