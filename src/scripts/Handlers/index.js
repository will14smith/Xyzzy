import { AjaxOperation } from '../constants';

import ajaxResponse from './AjaxResponse';
import ajaxError from './AjaxError';

import firstLoad from './Ajax/FirstLoad';
import register from './Ajax/Register';

export function init(dispatcher) {
  dispatcher.on('ajaxResponse', ajaxResponse);
  dispatcher.on('ajaxError', ajaxError);

  dispatcher.on(`${AjaxOperation.FIRST_LOAD}Response`, firstLoad);
  dispatcher.on(`${AjaxOperation.REGISTER}Response`, register);
}
