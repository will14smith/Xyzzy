import Builder from './_ajax';
import { AjaxRequest, AjaxOperation } from '../constants';

export default function({ message, scope }) {
  let op;
  switch (scope) {
  case 'global': op = AjaxOperation.CHAT; break;
  default: throw new Error(`Invalid message scope: ${scope}`);
  }

  const builder = new Builder(op);

  if (message.startsWith('/me ')) {
    builder
      .with(AjaxRequest.MESSAGE, message.substr(4).trim())
      .with(AjaxRequest.EMOTE, true);
  } else if (message.startsWith('/wall ')) {
    builder
      .with(AjaxRequest.MESSAGE, message.substr(6).trim())
      .with(AjaxRequest.EMOTE, false)
      .with(AjaxRequest.WALL, true);
  } else {
    builder
      .with(AjaxRequest.MESSAGE, message)
      .with(AjaxRequest.EMOTE, false);
  }

  builder.run();
}
