import { dispatch } from '../dispatcher';

import { GamePlayerInfo, GameOptionData, GameInfo } from '../constants';

export class Game {
  constructor({
    id, state,
    host, players, playerLimit, spectators, spectatorLimit,
    idleTimerEnabled, passworded,
    cardSets, blankLimit, scoreLimit,
   }) {
    this._id = id;
    this._state = state;
    this._host = host;
    this._players = players;
    this._playerLimit = playerLimit;
    this._spectators = spectators;
    this._spectatorLimit = spectatorLimit;
    this._idleTimerEnabled = idleTimerEnabled;
    this._passworded = passworded;
    this._cardSets = cardSets;
    this._blankLimit = blankLimit;
    this._scoreLimit = scoreLimit;
  }

  get id() { return this._id; }
  get state() { return this._state; }
  get host() { return this._host; }
  get players() { return this._players; }
  get playerLimit() { return this._playerLimit; }
  get spectators() { return this._spectators; }
  get spectatorLimit() { return this._spectatorLimit; }
  get idleTimerEnabled() { return this._idleTimerEnabled; }
  get passworded() { return this._passworded; }
  get cardSets() { return this._cardSets; }
  get blankLimit() { return this._blankLimit; }
  get scoreLimit() { return this._scoreLimit; }

  static fromServer(data) {
    const options = data[GameInfo.GAME_OPTIONS];

    return new Game({
      id: data[GameInfo.ID],
      state: data[GameInfo.STATE],

      host: data[GameInfo.HOST],
      players: data[GameInfo.PLAYERS],
      playerLimit: options[GameOptionData.PLAYER_LIMIT],
      spectators: data[GameInfo.SPECTATORS],
      spectatorLimit: options[GameOptionData.SPECTATOR_LIMIT],

      idleTimerEnabled: options[GameOptionData.USE_TIMER],
      passworded: data[GameInfo.HAS_PASSWORD],

      cardSets: options[GameOptionData.CARD_SETS],
      blankLimit: options[GameOptionData.USE_TIMER],
      scoreLimit: options[GameOptionData.SCORE_LIMIT],
    });
  }
}

export class PlayerInfo {
  constructor({ name, score, state }) {
    this._name = name;
    this._score = score;
    this._state = state;
  }

  get name() { return this._name; }
  get score() { return this._score; }
  get state() { return this._state; }

  static fromServer(data) {
    return new PlayerInfo({
      name: data[GamePlayerInfo.NAME],
      score: data[GamePlayerInfo.SCORE],
      state: data[GamePlayerInfo.STATUS],
    });
  }
}

class GameStore {
  constructor() {
    this._games = { };
    this._playerInfo = { };
  }

  getGame(id) {
    return this._games[id];
  }
  getPlayerInfo(id) {
    return this._playerInfo[id];
  }

  set(id, game, playerInfo) {
    this._games[id] = game;
    this._playerInfo[id] = playerInfo;
    
    dispatch(`game:${id}`);
  }
}

const gameStore = new GameStore();

export default gameStore;
