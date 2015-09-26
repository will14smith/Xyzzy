import { LongPollResponse } from '../../constants';

import gameStore, { Game } from '../../Models/Game';

export default function handle(res) {
  const rawGame = res[LongPollResponse.GAME_INFO];

  const game = Game.fromServer(rawGame);
  gameStore.set(game.id, game);
}
