import Builder from './_ajax';
import { AjaxRequest, AjaxOperation } from '../constants';

export default function({ id, password }) {
  const builder = new Builder(AjaxOperation.JOIN_GAME);

  builder
    .with(AjaxRequest.GAME_ID, id)
    .with(AjaxRequest.PASSWORD, password)
    .run();
}
