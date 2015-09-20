import React from 'react';

import dispatcher from './dispatcher';
import chatStore from './Models/Chat';

import loadNames from './Actions/Names';

export default class Chat extends React.Component {
  constructor() {
    super();
    // get cached names
    this.state = { names: chatStore.getNames() };
  }

  componentDidMount() {
    this._handleNames = () => this.setState({ names: chatStore.getNames() });
    dispatcher.on('names', this._handleNames);

    loadNames();
  }

  componentWillUnmount() {
    dispatcher.off('names', this._handleNames);
  }

  render() {
    const names = this.state.names.length > 0
      ? this.state.names.map(name => <li key={name}>{name}</li>)
      : <li>Loading...</li>;

    return (<div className="card">
      <ul>
        {names}
      </ul>
    </div>);
  }
}
