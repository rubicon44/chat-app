import React from 'react';
import styled from 'styled-components';
import { auth } from '../../../infra/firebase.js';

const ButtonStyle = styled.button`
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

function LogOutButton(props) {
  return (
    // コンテキストを使わずにログアウト
    <ButtonStyle onClick={() => auth.signOut()}>{props.text}</ButtonStyle>
  )
}

export default LogOutButton;