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
  dispatcher.dispatch(`${request.op}AjaxResponse`, data, request);
}

function error(data, dispatcher) {
  const request = getRequest(data);
  dispatcher.dispatch(`${request.op}AjaxError`, data, request);
}

function handle(dispatcher, op, successFn, errorFn) {
  if (successFn) {
    dispatcher.on(`${op}AjaxResponse`, successFn);
  }
  if (errorFn) {
    dispatcher.on(`${op}AjaxError`, errorFn);
  }
}

import firstLoad, { handleError as firstLoadError } from './FirstLoad';
import register from './Register';

export function init(dispatcher) {
  dispatcher.on('ajaxResponse', success);
  dispatcher.on('ajaxError', error);

  handle(dispatcher, AjaxOperation.FIRST_LOAD, firstLoad, firstLoadError);
  handle(dispatcher, AjaxOperation.REGISTER, register);
}
