import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './assets/styles/reset.css';

// 認証前・サインイン・サインアップ
import Top from './static_pages/top';
import SignIn from './static_pages/sign_in';
import SignUp from './static_pages/sign_up';
// メッセージ
import Chat from './components/containers/pages/chat';
import ChatIndivisual from './components/containers/pages/chatIndivisual';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* top・サインイン・サインアップ */}
            <Route exact path="/top" component={Top} />
            <Route exact path="/sign_in" component={SignIn} />
            <Route exact path="/sign_up" component={SignUp} />
            {/* チャット */}
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/chatIndivisual" component={ChatIndivisual} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;

