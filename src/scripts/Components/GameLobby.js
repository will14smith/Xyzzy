import React from 'react';

import GameStateComponent from './_GameStateComponent';

import { GameOptionData } from '../constants';
import changeGameOptions from '../Actions/ChangeGameOptions';
import { get as getCardSet } from '../Models/CardSet';

const optionMap = {
  scoreLimit: GameOptionData.SCORE_LIMIT,
  playerLimit: GameOptionData.PLAYER_LIMIT,
  spectatorLimit: GameOptionData.SPECTATOR_LIMIT,
  idleTimerEnabled: GameOptionData.USE_TIMER,
  password: GameOptionData.PASSWORD,
  cardSets: GameOptionData.CARD_SETS,
  blankLimit: GameOptionData.BLANKS_LIMIT,
};

function getOptions(game) {
  const options = {};

  Object.keys(optionMap).forEach(key => options[optionMap[key]] = game[key]);

  return options;
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
    const rawDelta = {};
    Object.keys(delta).forEach(key => rawDelta[optionMap[key]] = delta[key]);

    const newOptions = Object.assign({}, getOptions(this.state.game), rawDelta);

    // TODO apply speculatively

    changeGameOptions({ gameId: this.props.gameId, options: newOptions });
  }

  _renderDropdown(game, key, min, max) {
    const values = Array.from(Array(max - min).keys()).map(i => <option value={i + min}>{i + min}</option>);

    return (<select value={game[key]}
      onChange={event => this.updateSettings({ [key]: parseInt(event.target.value, 10) })}>{values}</select>);
  }

  _renderCardSet(game, cardSet) {
    const checked = game.cardSets.indexOf(cardSet.id) > -1;
    const handler = event => {
      const cardSets = [...game.cardSets];

      if (event.target.checked) {
        // TODO check it isn't already present
        cardSets.push(cardSet.id);
      } else {
        const idx = cardSets.indexOf(cardSet.id);
        if (idx > -1) {
          cardSets.splice(idx, 1);
        }
      }

      this.updateSettings({ cardSets });
    };

    return <label key={cardSet.id}><input type="checkbox" checked={checked} onChange={handler} /> {cardSet.name}</label>;
  }

  _renderHost() {
    const game = this.state.game;

    const cardSets = <div className="grid__9">{getCardSet().map(cardSet => this._renderCardSet(game, cardSet))}</div>;

    return (<div className="card grid">
      <div className="grid__3 text--right">Score limit</div>
      <div className="grid__9">{this._renderDropdown(game, 'scoreLimit', 4, 69)}</div>

      <div className="grid__3 text--right">Player limit</div>
      <div className="grid__9">{this._renderDropdown(game, 'playerLimit', 3, 20)}</div>

      <div className="grid__3 text--right">Spectator limit</div>
      <div className="grid__9">{this._renderDropdown(game, 'spectatorLimit', 0, 20)}</div>

      <div className="grid__3 text--right">Idle Timer</div>
      <div className="grid__9">
        <input type="checkbox" checked={this.state.game.idleTimerEnabled ? 'checked' : ''}
          onChange={event => this.updateSettings({ idleTimerEnabled: event.target.value })} />
      </div>

      <div className="grid__3 text--right">Password</div>
      <div className="grid__9">
        <input type="text" value={this.state.game.password}
          onChange={event => this.updateSettings({ password: event.target.value })} />
      </div>

      <div className="grid__3 text--right">Card Sets</div>
      {cardSets}
    </div>);
  }

  _renderPlayer() {
    const game = this.state.game;

    let password = null;
    if (game.passworded) {
      password = (<div>
        <div className="grid__3 text--right">Password</div>
        <div className="grid__9"><pre>{game.password}</pre></div>
      </div>);
    }

    const cardSetIds = [...game.cardSets];
    cardSetIds.sort((a, b) => a - b);
    const cardSetNames = cardSetIds.map(id => getCardSet(id).name);
    const blankCards = game.blankLimit > 0 ? [`${game.blankLimit} blank cards`] : [];

    return (<div className="card grid">
      <div className="grid__3 text--right">Score limit</div>
      <div className="grid__9">{game.scoreLimit}</div>

      <div className="grid__3 text--right">Player limit</div>
      <div className="grid__9">{game.playerLimit}</div>

      <div className="grid__3 text--right">Spectator limit</div>
      <div className="grid__9">{game.spectatorLimit}</div>

      <div className="grid__3 text--right">Idle Timer</div>
      <div className="grid__9"><input type="checkbox" readOnly checked={game.idleTimerEnabled ? 'checked' : ''} /></div>

      {password}

      <div className="grid__3 text--right">Card Sets</div>
      <div className="grid__9">{cardSetNames.concat(blankCards).join(', ')}</div>
    </div>);
  }

  render() {
    // settings: Score limit, player limit, spectator limit, enable idle timer, password, cardsets (& blank cards)
    if (this.props.isHosting) {
      return this._renderHost();
    }

    return this._renderPlayer();
  }
}
