import { AjaxResponse } from '../../constants';
import gameStore, { Game, PlayerInfo } from '../../Models/Game';

export default function handle(res) {
  const rawGame = res[AjaxResponse.GAME_INFO];
  const rawPlayerInfo = res[AjaxResponse.PLAYER_INFO];

  const game = Game.fromServer(rawGame);
  const playerInfo = rawPlayerInfo.map(PlayerInfo.fromServer);

  gameStore.set(game.id, game, playerInfo);
}
