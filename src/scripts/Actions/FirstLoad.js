import Builder from './_ajax';
import { AjaxOperation } from '../constants';

export default function() {
  const builder = new Builder(AjaxOperation.FIRST_LOAD);

  builder.run();
}
