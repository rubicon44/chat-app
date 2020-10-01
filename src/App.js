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

