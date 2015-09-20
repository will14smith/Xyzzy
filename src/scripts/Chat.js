import React from 'react';

import dispatcher from './dispatcher';
import chatStore from './Models/Chat';

import sendMessage from './Actions/Chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    // get cached names
    this.state = this.buildState();
  }

  buildState() {
    return {
      state: (this.state ? this.state.state : null) || 'messages',

      names: chatStore.getNames(),
      messages: chatStore.getMessages(),
    };
  }

  componentDidMount() {
    this._handleNames = () => this.setState(this.buildState());
    this._handleMessages = () => this.setState(this.buildState());
    dispatcher.on('names', this._handleNames);
    dispatcher.on('messages', this._handleMessages);
  }

  componentWillUnmount() {
    dispatcher.off('names', this._handleNames);
    dispatcher.off('messages', this._handleMessages);
  }

  render() {
    // TODO tab selector

    switch (this.state.state) {
    case 'messages':
      return this.renderMessages();
    default:
      return this.renderUsers();
    }
  }

  sendMessage(e) {
    e.preventDefault();

    const messageEl = React.findDOMNode(this.refs.message);
    const message = messageEl.value.trim();

    if (message !== '') {
      sendMessage({
        message: message,
        scope: 'global',
      });
      messageEl.value = '';
    }
  }

  renderMessages() {
    let i = 0;
    const messages = this.state.messages.map(message => (
      <li key={i++}>
        <span>[{message.time}]</span>
        { message.author ? (<span>&lt;{message.author}&gt;</span>) : null }
        <span>{message.text}</span>
      </li>
    ));

    return (<div className="card">
      <ul className="list list--messages">
        {messages}
        <li key={i}>
          <form onSubmit={e => this.sendMessage(e)}>
            <input type="text" placeholder="Send a message..." ref="message" />
          </form>
        </li>
      </ul>
    </div>);
  }

  renderUsers() {
    const names = this.state.names.length > 0
      ? this.state.names.map(name => <li key={name}><a>{name}</a></li>)
      : <li><a>Loading...</a></li>;

    return (<div className="card">
      <ul className="list">
        {names}
      </ul>
    </div>);
  }

}
