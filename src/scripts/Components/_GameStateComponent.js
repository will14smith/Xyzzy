import React from 'react';

import dispatcher from '../dispatcher';

import gameStore from '../Models/Game';

export default class GameStateComponent extends React.Component {
  static propTypes = {
    gameId: React.PropTypes.number.isRequired,
    isHosting: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      game: gameStore.getGame(props.gameId),
    };
  }

  componentDidMount() {
    this.bind(this.props.gameId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameId === nextProps.gameId) {
      return;
    }

    this.unbind(this.props.gameId);
    this.bind(nextProps.gameId);
  }

  componentWillUnmount() {
    this.unbind(this.props.gameId);
  }

  bind(gameId) {
    dispatcher.on(`game:${gameId}`, this._handleGame);
  }
  unbind(gameId) {
    dispatcher.off(`game:${gameId}`, this._handleGame);
  }

  render() {
    return <div className="card">Lobby</div>;
  }
}
