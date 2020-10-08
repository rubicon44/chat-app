import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  // Switch,
} from 'react-router-dom';
import './assets/styles/reset.css';

// 認証用Context
import { AuthProvider } from './auth/authProvider';
import PrivateRoute from './auth/privateRoute';

// 認証前・サインイン・サインアップ
import Top from './static_pages/top';
import SignIn from './static_pages/sign_in';
import SignUp from './static_pages/sign_up';
import LineLink from './line/lineLink';
import LineLinkEx from './line/lineLinkEx';
// ユーザー詳細
import UserList from './components/containers/pages/userList';
import User from './components/containers/pages/user';
// ToDo管理
import ToDo from './toDo/containers/pages/toDo';
import Create from './toDo/containers/pages/create';
import Show from './toDo/containers/pages/show';
import Edit from './toDo/containers/pages/edit';
// メッセージ
import Chat from './components/containers/pages/chat';
import ChatIndivisual from './components/containers/pages/chatIndivisual';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            {/* <Switch> */}
              {/* top・サインイン・サインアップ */}
              <PrivateRoute exact path="/" component={Top} />
              <PrivateRoute exact path="/top" component={Top} />
              <Route exact path="/sign_in" component={SignIn} />
              <Route exact path="/sign_up" component={SignUp} />
              <Route exact path="/lineLink" component={LineLink} />
              <Route exact path="/lineLinkEx" component={LineLinkEx} />
              {/* <Route exact path="/lineLink" component={LineLink}>
                {<Redirect to="/sign_in" />}
              </Route> */}
              <PrivateRoute exact path="/userList" component={UserList} />
              <PrivateRoute exact path="/user" component={User} />
              {/* ToDo管理 */}
              <PrivateRoute exact path="/toDo" component={ToDo} />
              <PrivateRoute exact path="/create" component={Create} />
              <PrivateRoute exact path="/show/:id" component={Show} />
              <PrivateRoute exact path="/edit/:id" component={Edit} />
              {/* チャット */}
              <PrivateRoute exact path="/chat" component={Chat} />
              <PrivateRoute exact path="/chatIndivisual" component={ChatIndivisual} />
            {/* </Switch> */}
          </div>
        </Router>
      </AuthProvider>
    )
  }
};

export default App;

