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

import createGame from './CreateGame';
import firstLoad, { handleError as firstLoadError } from './FirstLoad';
import gameList from './GameList';
import getGameInfo from './GetGameInfo';
import joinGame from './JoinGame';
import leaveGame from './LeaveGame';
import names from './Names';
import register from './Register';
import startGame, { handleError as startGameError } from './StartGame';

export function init(dispatcher) {
  dispatcher.on('ajaxResponse', success);
  dispatcher.on('ajaxError', error);

  handle(dispatcher, AjaxOperation.CHANGE_GAME_OPTIONS, () => { /* NOOP */ });
  handle(dispatcher, AjaxOperation.CREATE_GAME, createGame);
  handle(dispatcher, AjaxOperation.FIRST_LOAD, firstLoad, firstLoadError);
  handle(dispatcher, AjaxOperation.GAME_LIST, gameList);
  handle(dispatcher, AjaxOperation.GET_GAME_INFO, getGameInfo);
  handle(dispatcher, AjaxOperation.JOIN_GAME, joinGame);
  handle(dispatcher, AjaxOperation.LEAVE_GAME, leaveGame);
  handle(dispatcher, AjaxOperation.NAMES, names);
  handle(dispatcher, AjaxOperation.REGISTER, register);
  handle(dispatcher, AjaxOperation.START_GAME, startGame, startGameError);
}
