import { AjaxResponse } from '../../constants';
import loadNames from '../../Actions/Names';
import longPoll from '../../Actions/LongPoll';

export default function handle(res, req, dispatcher) {
  const name = res[AjaxResponse.NICKNAME];
  // TODO set nickname

  loadNames();
  longPoll();

  dispatcher.dispatch('c_browser');
}
