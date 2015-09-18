import Builder from './_ajax';
import { AjaxRequest, AjaxOperation } from '../constants';

export default function({ name }) {
  const builder = new Builder(AjaxOperation.REGISTER);

  builder
    .with(AjaxRequest.NICKNAME, name)
    .run();
}
