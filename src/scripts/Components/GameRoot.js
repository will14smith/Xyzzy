import React from 'react';

import { GameState } from '../constants';

import Chat from './Chat';
import GamePlayer from './GamePlayer';

import GameDealing from './GameDealing';
import GameJudging from './GameJudging';
import GameLobby from './GameLobby';
import GamePlaying from './GamePlaying';
import GameRoundOver from './GameRoundOver';

import dispatcher from '../dispatcher';
import appState from '../Models/App';
import gameStore from '../Models/Game';
import getGameInfo from '../Actions/GetGameInfo';
import leaveGame from '../Actions/LeaveGame';

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

  renderGame() {
    if (!this.state.game) {
      return <div className="card">Loading...</div>;
    }

    const isHosting = this.state.game.host === appState.username;
    // 2 states: lobby (host, player, spectator), playing (player, spectator)

    switch (this.state.game.state) {
    case GameState.LOBBY: return <GameLobby gameId={this.state.game.id} isHosting={isHosting} />;
    case GameState.DEALING: return <GameDealing gameId={this.state.game.id} isHosting={isHosting} />;
    case GameState.PLAYING: return <GamePlaying gameId={this.state.game.id} isHosting={isHosting} />;
    case GameState.JUDGING: return <GameJudging gameId={this.state.game.id} isHosting={isHosting} />;
    case GameState.ROUND_OVER: return <GameRoundOver gameId={this.state.game.id} isHosting={isHosting} />;
    default: throw new Error(`Unknown game state ${this.state.game.state}`);
    }
  }

  renderPlayers() {
    const players = (this.state.playerInfo || []).map(player => <GamePlayer player={player} key={player.name} />);

    return <div className="grid">{players}</div>;
  }

  render() {
    return (<div className="grid">
      <div className="grid__9">
        {this.renderControls()}
        {this.renderGame()}
        {this.renderPlayers()}
      </div>
      <div className="grid__3"><Chat /></div>
    </div>);
  }
}
