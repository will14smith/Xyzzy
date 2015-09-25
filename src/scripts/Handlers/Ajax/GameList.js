import { AjaxResponse } from '../../constants';

import { Game } from '../../Models/Game';
import gamesStore from '../../Models/Games';

export default function handle(res) {
  const games = res[AjaxResponse.GAMES];
  // const maxGames = res[AjaxResponse.MAX_GAMES];

  gamesStore.setGames(games.map(Game.fromServer));
}
