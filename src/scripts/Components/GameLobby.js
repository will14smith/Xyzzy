import React from 'react';

import GameStateComponent from './_GameStateComponent';

import { GameOptionData } from '../constants';
import { get as getCardSet } from '../Models/CardSet';

function getOptions(game) {
  return {
    [GameOptionData.SCORE_LIMIT]: game.scoreLimit,
    [GameOptionData.PLAYER_LIMIT]: game.playerLimit,
    [GameOptionData.SPECTATOR_LIMIT]: game.spectatorLimit,
    [GameOptionData.USE_TIMER]: game.idleTimerEnabled,
    [GameOptionData.PASSWORD]: game.password,
    [GameOptionData.CARD_SETS]: game.cardSets,
    [GameOptionData.BLANKS_LIMIT]: game.blankLimit,
  };
}

export default class GameLobby extends GameStateComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  updateSettings(delta) {
    const newOptions = Object.assign({}, getOptions(this.state.game), delta);

    // changeGameOptions({ gameId: this.props.gameId, options: newOptions });
  }

  _renderHost() {
    return <div className="card">Host Lobby</div>;
  }

  _renderPlayer() {
    let password = null;
    if (this.state.game.passworded) {
      password = (<div>
        <div className="grid__3 text--right">Password</div>
        <div className="grid__9">{this.state.game.passworded ? <pre>{this.state.game.password}</pre> : <em>Disabled.</em> }</div>
      </div>);
    }

    const cardSetIds = [...this.state.game.cardSets];
    cardSetIds.sort((a, b) => a - b);
    const cardSetNames = cardSetIds.map(id => getCardSet(id).name);
    const blankCards = this.state.game.blankLimit > 0 ? [`${this.state.game.blankLimit} blank cards`] : [];
    const cardSets = (<div>
      <div className="grid__3 text--right">Card Sets</div>
      <div className="grid__9">{cardSetNames.concat(blankCards).join(', ')}</div>
    </div>);

    return (<div className="card grid">
      <div className="grid__3 text--right">Score limit</div>
      <div className="grid__9">{this.state.game.scoreLimit}</div>

      <div className="grid__3 text--right">Player limit</div>
      <div className="grid__9">{this.state.game.playerLimit}</div>

      <div className="grid__3 text--right">Spectator limit</div>
      <div className="grid__9">{this.state.game.spectatorLimit}</div>

      <div className="grid__3 text--right">Idle Timer</div>
      <div className="grid__9"><input type="checkbox" readOnly checked={this.state.game.idleTimerEnabled ? 'checked' : ''} /></div>

      {password}

      {cardSets}
    </div>);
  }

  render() {
    // settings: Score limit, player limit, spectator limit, enable idle timer, password, cardsets (& blank cards)
    if (this.state.isHosting) {
      return this._renderHost();
    }

    return this._renderPlayer();
  }
}
