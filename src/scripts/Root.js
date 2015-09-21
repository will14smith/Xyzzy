import React from 'react';

import Register from './Register';
import Browser from './Browser';
import Chat from './Chat';
import GameRoot from './GameRoot';

import dispatcher from './dispatcher';
import firstLoad from './Actions/FirstLoad';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = { state: 'loading' };
  }

  componentDidMount() {
    this._handleRegister = () => this.setState({ state: 'register' });
    this._handleBrowser = () => this.setState({ state: 'browser' });
    this._handleGame = gid => this.setState({ state: 'game', gid: gid });

    dispatcher.on('c_register', this._handleRegister);
    dispatcher.on('c_browser', this._handleBrowser);
    dispatcher.on('c_game', this._handleGame);

    firstLoad();
  }

  componentWillUnmount() {
    dispatcher.off('c_register', this._handleRegister);
    dispatcher.off('c_browser', this._handleBrowser);
    dispatcher.off('c_game', this._handleGame);
  }

  render() {
    switch (this.state.state) {
    case 'register':
      return <Register />;
    case 'browser':
      return (<div className="grid">
        <div className="grid__9"><Browser /></div>
        <div className="grid__3"><Chat /></div>
      </div>);
    case 'game':
      return <GameRoot gameId={this.state.gid} />;
    default:
      return <div className="card text--center">Loading...</div>;
    }
  }
}
