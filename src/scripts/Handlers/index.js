import { init as ajaxInit } from './Ajax';
import { init as longPollInit } from './LongPoll';

export function init(dispatcher) {
  ajaxInit(dispatcher);
  longPollInit(dispatcher);
}
