import { AjaxResponse } from '../../constants';
import { log } from '../../utils';

import appState from '../../Models/App';

import loadNames from '../../Actions/Names';
import longPoll from '../../Actions/LongPoll';

export function postRegisterInit(res) {
  appState.username = res[AjaxResponse.NICKNAME];

  log(`You are playing as: ${appState.username}`);

  loadNames();
  longPoll();
}

export default function handle(res, req, dispatcher) {
  postRegisterInit(res);

  dispatcher.dispatch('c_browser');
}
