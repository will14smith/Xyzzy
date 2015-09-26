import Builder from './_ajax';
import { AjaxRequest, AjaxOperation, GameOptionData } from '../constants';

export default function({ gameId, options }) {
  const builder = new Builder(AjaxOperation.CHANGE_GAME_OPTIONS);

  // TODO check types of int fields

  if (Array.isArray(options[GameOptionData.CARD_SETS])) {
    options[GameOptionData.CARD_SETS] = options[GameOptionData.CARD_SETS].join(',');
  }

  builder
    .with(AjaxRequest.GAME_ID, gameId)
    .with(AjaxRequest.GAME_OPTIONS, options)
    .run();
}
