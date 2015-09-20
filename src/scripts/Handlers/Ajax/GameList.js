import { AjaxResponse } from '../../constants';
import gamesStore, { Game } from '../../Models/Games';

export default function handle(res) {
  const games = res[AjaxResponse.GAMES];
  const maxGames = res[AjaxResponse.MAX_GAMES];

  gamesStore.setGames(games.map(Game.fromServer));
}
