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
import startGame from '../Actions/StartGame';

export default class GameRoot extends React.Component {
  static propTypes = {
    gameId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this._handleGame = () => {
      const gameId = this.props.gameId;
      const game = gameStore.getGame(gameId);
      const playerInfo = gameStore.getPlayerInfo(gameId);

      this.setState({ game, playerInfo });
    };

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

    getGameInfo({ gameId });
  }
  unbind(gameId) {
    dispatcher.off(`game:${gameId}`, this._handleGame);
  }

  startGame(event) {
    event.preventDefault();
    startGame({ gameId: this.props.gameId });
  }
  leaveGame(event) {
    event.preventDefault();
    leaveGame({ gameId: this.props.gameId });
  }

  renderControls(game, isHosting) {
    const showStart = game && game.state === GameState.LOBBY && isHosting;

    return (<div className="grid">
      <div className="grid__6 text--left">
        {(showStart ? <a onClick={e => this.startGame(e)} className="card">Start</a> : null)}
      </div>
      <div className="grid__6 text--right">
        <a onClick={e => this.leaveGame(e)} className="card">Leave Game</a>
      </div>
    </div>);
  }

  renderGame(game, isHosting) {
    if (!game) {
      return <div className="card">Loading...</div>;
    }

    switch (game.state) {
    case GameState.LOBBY: return <GameLobby gameId={game.id} isHosting={isHosting} />;
    case GameState.DEALING: return <GameDealing gameId={game.id} isHosting={isHosting} />;
    case GameState.PLAYING: return <GamePlaying gameId={game.id} isHosting={isHosting} />;
    case GameState.JUDGING: return <GameJudging gameId={game.id} isHosting={isHosting} />;
    case GameState.ROUND_OVER: return <GameRoundOver gameId={game.id} isHosting={isHosting} />;
    default: throw new Error(`Unknown game state ${game.state}`);
    }
  }

  renderPlayers() {
    const players = (this.state.playerInfo || []).map(player => <GamePlayer player={player} key={player.name} />);

    return <div className="grid">{players}</div>;
  }

  render() {
    const game = this.state.game;
    const isHosting = game && game.host === appState.username;

    return (<div className="grid">
      <div className="grid__9">
        {this.renderControls(game, isHosting)}
        {this.renderGame(game, isHosting)}
        {this.renderPlayers()}
      </div>
      <div className="grid__3"><Chat /></div>
    </div>);
  }
}
