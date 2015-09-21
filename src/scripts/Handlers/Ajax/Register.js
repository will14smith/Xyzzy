import { AjaxResponse } from '../../constants';
import { log } from '../../utils';

import loadNames from '../../Actions/Names';
import longPoll from '../../Actions/LongPoll';

export function postRegisterInit(res) {
  const name = res[AjaxResponse.NICKNAME];
  // TODO set nickname

  log(`You are playing as: ${name}`);

  loadNames();
  longPoll();
}

export default function handle(res, req, dispatcher) {
  postRegisterInit(res);

  dispatcher.dispatch('c_browser');
}
