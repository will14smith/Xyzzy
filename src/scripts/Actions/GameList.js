import Builder from './_ajax';
import { AjaxOperation } from '../constants';

export default function() {
  const builder = new Builder(AjaxOperation.GAME_LIST);

  builder.run();
}
