import { AjaxResponse } from '../../constants';
import longPoll from '../../Actions/LongPoll';

export default function handle(res, req, dispatcher) {
  const name = res[AjaxResponse.NICKNAME];
  // TODO set nickname

  longPoll();

  dispatcher.dispatch('c_browser');
}
