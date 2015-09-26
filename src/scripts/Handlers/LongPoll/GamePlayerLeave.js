import { LongPollResponse } from '../../constants';

import getGameInfo from '../../Actions/GetGameInfo';

export default function handle(res) {
  const gameId = res[LongPollResponse.GAME_ID];

  getGameInfo({ gameId });
}
