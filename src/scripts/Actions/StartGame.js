import Builder from './_ajax';
import { AjaxRequest, AjaxOperation } from '../constants';

export default function({ gameId }) {
  const builder = new Builder(AjaxOperation.START_GAME);

  builder
    .with(AjaxRequest.GAME_ID, gameId)
    .run();
}
