import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './assets/styles/reset.css';

// 認証前・サインイン・サインアップ
import Top from './static_pages/top';
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

