import { dispatch } from '../dispatcher';

class GamesStore {
  constructor() {
    this._games = [];
  }

  getGames() {
    return [...this._games];
  }
  setGames(games) {
    this._games = games;
    dispatch('games');
  }
}

const gamesStore = new GamesStore();

export default gamesStore;
