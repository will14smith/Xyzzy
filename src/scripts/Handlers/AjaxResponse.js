import { AjaxResponse } from '../constants';
import Builder from '../Actions/_ajax';

export default function handle(data, dispatcher) {
  const serial = data[AjaxResponse.SERIAL];
  const request = Builder.getPending(serial);

  Builder.removePending(serial);

  dispatcher.dispatch(`${request.op}Response`, data, request);
}
