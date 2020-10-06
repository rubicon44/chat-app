import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../../infra/firebase.js';

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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    const email = user.email;

    this.setState({
      email: email,
    });
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
              {/* todo:「チャット」部分をMaterial-uiのメッセージ画像に差し替える */}
            <NextChatIndivisualButton to="/chatIndivisual">チャット</NextChatIndivisualButton>
          </div>
          <Title>ユーザー詳細</Title>
            <div>{this.state.email}</div>
        </TopBackground>
      </div>
    )
  }
}

export default User;