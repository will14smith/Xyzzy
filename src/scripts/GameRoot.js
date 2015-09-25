import React from 'react';

import { GamePlayerStatusMessage } from './constants';

import Chat from './Chat';

import dispatcher from './dispatcher';
import gameStore from './Models/Game';
import getGameInfo from './Actions/GetGameInfo';
import leaveGame from './Actions/LeaveGame';

export default class GameRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: props.gameId };
  }

  componentDidMount() {
    this._handleGame = () => {
      const gameId = this.state.gameId;
      const game = gameStore.getGame(gameId);
      const playerInfo = gameStore.getPlayerInfo(gameId);

      this.setState({ gameId, game, playerInfo });
    };

    this.bind();
  }

  componentWillReceiveProps(nextProps) {
    this.unbind();
    this.setState({ gameId: nextProps.gameId });
    this.bind();
  }

  componentWillUnmount() {
    this.unbind();
  }

  bind() {
    dispatcher.on(`game:${this.state.gameId}`, this._handleGame);

    getGameInfo({ gameId: this.state.gameId });
  }
  unbind() {
    dispatcher.off(`game:${this.state.gameId}`, this._handleGame);
  }

  startGame(event) {
    event.preventDefault();
    // TODO
  }
  leaveGame(event) {
    event.preventDefault();
    leaveGame({ gameId: this.state.gameId });
  }

  renderControls() {
    // TODO show/hide start button
    return (<div className="grid">
      <div className="grid__6 text--left">
        <a onClick={e => this.startGame(e)} className="card">Start</a>
      </div>
      <div className="grid__6 text--right">
        <a onClick={e => this.leaveGame(e)} className="card">Leave Game</a>
      </div>
    </div>);
  }

  renderPlayers() {
    const players = (this.state.playerInfo || []).map(player => {
      return (<div className="grid__4" key={player.name}>
        <div className="card">
          <strong>{player.name}</strong><span> - {player.score} - {GamePlayerStatusMessage[player.state]}</span>
        </div>
      </div>);
    });

    return (<div className="grid">
      {players}
    </div>);
  }

  render() {
    const game = <div className="card card--warning">IN GAME!</div>;

    // 2 states: lobby (host, player, spectator), playing (player, spectator)

    return (<div className="grid">
      <div className="grid__9">
        {this.renderControls()}
        {game}
        {this.renderPlayers()}
      </div>
      <div className="grid__3"><Chat /></div>
    </div>);
  }
}
