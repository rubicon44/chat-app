import React from 'react';
import styled from 'styled-components';

import { auth } from '../../../infra/firebase.js';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Toolbar from '@material-ui/core/Toolbar';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';
import SendIcon from '@material-ui/icons/Send';

const UserIdLeft = styled.div`
  text-align: left;
`

const UserIdRight = styled.div`
  text-align: right;
`

const MessageList = styled.dl`
  text-align: left;
  margin-bottom: 12px;

  > dd {
    display: inline-block;
    max-width: 225px;
    padding: 5px;
    font-size: 14px;
    text-align: left;
    border: 1px solid #d3d3d3;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: #fff;
    // 下記で、開業を反映させる。
    white-space: pre-line;
    // 自動改行
    word-break: break-all;
  }
`

const MessageListRight = styled.dl`
  text-align: right;
  margin-bottom: 12px;

  > dd {
    display: inline-block;
    max-width: 225px;
    padding: 5px;
    font-size: 14px;
    text-align: left;
    border: 1px solid #d3d3d3;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: #fff;
    // 下記で、開業を反映させる。
    white-space: pre-line;
    // 自動改行
    word-break: break-all;
  }
`

const MessageListCover = styled.div`
  margin-top: 30px;
`

const MessageBottomBarIconCover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  padding: 13px;
  color: #ff444f;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;

  > span {
    height: 23px;
  }
`

const useStyles = makeStyles((theme) => ({
  messageListCover: {
    marginTop: '30px',
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    boxSizing: 'border-box',
    backgroundColor: "#fff",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  root: {
    alignItems: 'flex-end',
    minHeight: '50px',
    maxHeight: '300px',
    maxWidth: '520px',
    margin: 'auto',
    padding: 0,
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
    height: '50px',
    margin: 'auto 0',
      border: `1px solid #ff878e`,
    },
  },
  bottomAppBarIcon: {
    '& svg': {
      margin: 0,
    },
  },
  textFied: {
    maxHeight: '290px',
    width: '213px',
    padding: '5px',
    margin: theme.spacing(1),
    fontSize: '14px',
    border: '1px solid #d7d7d7',
    borderRadius: '6px',
    resize: 'none',
  },
}));

export default function BottomChatBar(props) {
  const classes = useStyles();

  // const messageList = props.text.map((text, index) => (
  //   <MessageList key={index} id="messageList">
  //     <dt></dt>
  //     <dd key={index}>{text}<br /></dd>
  //   </MessageList>
  // ));

  const user = auth.currentUser;
  const user_id = user.uid;

  // const userId = props.user.map((user, index) => (
  //     <div key={index}>
  //       {(user_id === user.userId ? (
  //         <div key={index}>
  //           <UserIdRight key={index}>{user.userId}</UserIdRight>
  //           <MessageListRight key={index}>{user.text}</MessageListRight>
  //         </div>
  //       ) : (
  //         <div key={index}>
  //           <UserIdLeft key={index}>{user.userId}</UserIdLeft>
  //           <MessageList key={index}>{user.text}</MessageList>
  //         </div>
  //       )
  //       )}
  //     </div>
  //   ));

  const legth = props.userId.length;
  console.log(legth);

  const messageList = [];

  for (let i = 0; i < legth; i++){
    const userId = props.userId[i];
    const text = props.text[i];

    messageList.push(
      <div>
        {(user_id === userId ? (
          <div>
            <UserIdRight>{userId}</UserIdRight>
            <MessageListRight>
               <dt></dt>
               <dd>{text}<br /></dd>
            </MessageListRight>
          </div>
        ) : (
          <div>
            <UserIdLeft>{userId}</UserIdLeft>
            <MessageList>
               <dt></dt>
               <dd>{text}<br /></dd>
            </MessageList>
          </div>
        ))}
      </div>
    );
  }

  // const userId = props.userId.map((userId, index) => (
  //   <div key={index}>
  //     {(user_id === userId ? (
  //       <div key={index}>
  //         <UserIdRight key={index}>{userId}</UserIdRight>

  //         {/* <span key={index}>
  //           {
  //             props.text.map((text, index) => (
  //             <div key={index}>
  //               {(user_id === userId ? (
  //                 <MessageListRight key={index} id="messageList">
  //                   <dt></dt>
  //                   <dd key={index}>{text}<br /></dd>
  //                 </MessageListRight>
  //               ) : (
  //                 <MessageList key={index} id="messageList">
  //                   <dt></dt>
  //                   <dd key={index}>{text}<br /></dd>
  //                 </MessageList>
  //               )
  //               )}
  //             </div>
  //           ))}
  //         </span> */}
  //       </div>
  //     ) : (
  //       <div key={index}>
  //         <UserIdLeft key={index}>{userId}</UserIdLeft>
        
  //         {/* <span key={index}>
  //           {
  //             props.text.map((text, index) => (
  //             <div key={index}>
  //               {(user_id === userId ? (
  //                 <MessageListRight key={index} id="messageList">
  //                   <dt></dt>
  //                   <dd key={index}>{text}<br /></dd>
  //                 </MessageListRight>
  //               ) : (
  //                 <MessageList key={index} id="messageList">
  //                   <dt></dt>
  //                   <dd key={index}>{text}<br /></dd>
  //                 </MessageList>
  //               )
  //               )}
  //             </div>
  //           ))}
  //         </span> */}
  //       </div>
  //     )
  //     )}
  //   </div>
  // ));

  // const user = auth.currentUser;
  // const user_id = user.uid;
  
  // if(user_id === props.userId) {
  //   // スタイル変更
  //   document.getElementById('messageList').style.textAlign = "right";
  // }

  // console.log(user_id);
  // console.log(userId);

  // const messageList = (
  //   <MessageList key={props.index}>
  //       <dt></dt>
  //       <dd key={props.index}>{props.chat.text}<br /></dd>
  //   </MessageList>
  // );

  const messageSendButtonDisplay = (
    props.message !== '' &&
    <span><SendIcon onClick={ e => props.messageSendMethod(e)} /></span>
  );

  return (
    <React.Fragment>
      <CssBaseline />

     {/* メッセージリスト */}
     <MessageListCover>{messageList}</MessageListCover>
     {/* <MessageListCover>{userId}</MessageListCover> */}
         {/* <MessageListCover id="messageListCover">{messageList}</MessageListCover> */}

    {/* <MessageListCover id="messageListCover">
      {
        props.text.map((m, i) => (
          <MessageList key={i} id="messageList">
            <dt></dt>
            <dd key={i}>{m.userId}<br /></dd>
          </MessageList>
        ))
      }
    </MessageListCover> */}

     {/* bottomBar */}
     <AppBar position="fixed" color="primary" id="bottomBarVariableHeight" className={classes.appBar}>
        <Toolbar className={classes.root}>
          <MessageBottomBarIconCover className={classes.bottomAppBarIcon}>
            <span><PhotoCameraOutlinedIcon /></span>
          </MessageBottomBarIconCover>
          <MessageBottomBarIconCover className={classes.bottomAppBarIcon}>
            <span><BrokenImageOutlinedIcon /></span>
          </MessageBottomBarIconCover>
          <TextareaAutosize
            className={classes.textFied}
            value={props.message}
            onChange={ e => props.messageChangeMethod(e)}
          />
          <MessageBottomBarIconCover className={classes.bottomAppBarIcon}>{messageSendButtonDisplay}</MessageBottomBarIconCover>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}