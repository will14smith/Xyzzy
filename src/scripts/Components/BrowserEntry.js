import React from 'react';

import { GameStateText } from '../constants';

import joinGame from '../Actions/JoinGame';

export default class Browser extends React.Component {
  static propTypes = {
    game: React.PropTypes.object.isRequired,
  };

  constructor() {
    super();
  }

  joinGame(e, game) {
    e.preventDefault();
    if (game.passworded) {
      // TODO
    }

    joinGame({
      id: game.id,
    });
  }

  render() {
    const game = this.props.game;

    return (<div className="card browser-entry">
      <div className="browser-entry__title">Hosted by {game.host}</div>
      <div className="browser-entry__status">{GameStateText[game.state]}</div>
      <div className="browser-entry__info">
        <strong>Players: </strong>
        <span>{game.players.join(', ')} ({game.players.length}/{game.playerLimit}) </span>
        <strong>Spectators: </strong>
        <span>{game.spectators.join(', ')} ({game.spectators.length}/{game.spectatorLimit}) </span>
      </div>

      <div className="browser-entry__buttons">
        <div className="browser-entry__button browser-entry__button--join" onClick={e => this.joinGame(e, game)}>Join</div>
        <div className="browser-entry__button browser-entry__button--spectate">Spectate</div>
      </div>
    </div>);
  }
}
