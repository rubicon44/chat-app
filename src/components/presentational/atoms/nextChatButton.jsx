import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  background-color: #ff444f;
`

function NextChatButton(props) {
  return (
    <ButtonStyle to="/chat">{props.text}</ButtonStyle>
  )
}

export default NextChatButton;