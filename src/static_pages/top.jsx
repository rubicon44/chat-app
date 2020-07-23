import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../components/containers/organisms/header';
import NextChatButton from '../components/presentational/atoms/nextChatButton';

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

class Top extends Component {
  render() {
    return (
      <div>
        <Header />
        <TopBackground>
          <Title>Chap-app</Title>
          <NextChatButton text="さっそく使ってみる" />
        </TopBackground>
      </div>
    )
  }
}

export default Top;