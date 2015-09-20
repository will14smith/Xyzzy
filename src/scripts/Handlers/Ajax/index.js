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
import gameList from './GameList';
import names from './Names';
import register from './Register';

export function init(dispatcher) {
  dispatcher.on('ajaxResponse', success);
  dispatcher.on('ajaxError', error);

  handle(dispatcher, AjaxOperation.FIRST_LOAD, firstLoad, firstLoadError);
  handle(dispatcher, AjaxOperation.GAME_LIST, gameList);
  handle(dispatcher, AjaxOperation.NAMES, names);
  handle(dispatcher, AjaxOperation.REGISTER, register);
}
