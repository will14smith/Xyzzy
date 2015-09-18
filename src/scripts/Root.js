import React from 'react';

import Register from './Register';

import dispatcher from './dispatcher';
import firstLoad from './Actions/FirstLoad';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = { state: 'loading' };
  }

  componentDidMount() {
    this._handleRegister = () => this.setState({ state: 'register' });
    dispatcher.on('c_register', this._handleRegister);

    firstLoad();
  }

  componentWillUnmount() {
    dispatcher.off('c_register', this._handleRegister);
  }

  render() {
    switch (this.state.state) {
    case 'register':
      return <Register />;
    default:
      return <div className="card text--center">Loading...</div>;
    }
  }
}
