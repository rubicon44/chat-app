import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const HeaderCover = styled.div`
  display: flex;
  height: 50px;
  padding: 12px 15px;
  box-sizing: border-box;
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  font-family: YuMincho;
  color: #ff444f;
  text-decoraiton: none;
`

const HeaderMenuGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

// 下記「(theme) => ({~を追記することにより、useStylesの中でthemeが扱えるようになる。」
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  listCenter: {
    textAlign: 'center',
  },
  iconButton: {
    padding: 0,
    marginLeft: 16,
    color: '#bbb',
  },
}));

export default function SwipeableTemporaryDrawer() {
  // useStyles() を呼ぶと上記スタイリングが適応されるユニークなクラスネームが取得できる
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['ABOUT', 'CURRENT', 'MISSION', 'PROMOTION'].map((text, index) => (
          // 各コンポーネントにスタイルをあてる
          <ListItem button key={text} className={clsx(classes.listCenter)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['ログイン', '会員登録'].map((text, index) => (
          // 各コンポーネントにスタイルをあてる
          <ListItem button key={text} className={clsx(classes.listCenter)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <HeaderCover>
      <Logo to="/top">Chat-app</Logo>
      <HeaderMenuGroup>
        {/* 下記topという記述は、Drawerを画面丈夫から引き出すために必要な文言。bottomの場合、画面下からDrawerが引き出される。 */}
        {['top'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* 下記<MenuIcon />の記述を他のIconに変更すれば、Iconが変更される。 */}
            <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon /></IconButton>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </HeaderMenuGroup>
    </HeaderCover>
  );
}