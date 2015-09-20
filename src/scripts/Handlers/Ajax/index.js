import { AjaxOperation, AjaxResponse } from '../../constants';
import Builder from '../../Actions/_ajax';

function getRequest(data) {
  const serial = data[AjaxResponse.SERIAL];
  const request = Builder.getPending(serial);

  Builder.removePending(serial);

  return request;
}

function success(data, dispatcher) {
  const request = getRequest(data);
  dispatcher.dispatch(`a_${request.op}`, data, request);
}

function error(data, dispatcher) {
  const request = getRequest(data);
  dispatcher.dispatch(`ae_${request.op}`, data, request);
}

function handle(dispatcher, op, successFn, errorFn) {
  if (successFn) {
    dispatcher.on(`a_${op}`, successFn);
  }
  if (errorFn) {
    dispatcher.on(`ae_${op}`, errorFn);
  }
}

import firstLoad, { handleError as firstLoadError } from './FirstLoad';
import register from './Register';
import names from './Names';

export function init(dispatcher) {
  dispatcher.on('ajaxResponse', success);
  dispatcher.on('ajaxError', error);

  handle(dispatcher, AjaxOperation.FIRST_LOAD, firstLoad, firstLoadError);
  handle(dispatcher, AjaxOperation.REGISTER, register);
  handle(dispatcher, AjaxOperation.NAMES, names);
}
