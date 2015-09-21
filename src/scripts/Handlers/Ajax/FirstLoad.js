import { AjaxResponse, AjaxOperation, ErrorCode, ReconnectNextAction } from '../../constants';
import invokeFirstLoad from '../../Actions/FirstLoad';
import handleCardSets from '../../Actions/CardSets';
import { postRegisterInit } from './Register';

export default function handle(res, req, dispatcher) {
  handleCardSets(res[AjaxResponse.CARD_SETS]);

  if (res[AjaxResponse.IN_PROGRESS] !== true) {
    return dispatcher.dispatch('c_register');
  }

  postRegisterInit(res);

  const reconnectAction = res[AjaxResponse.NEXT];
  switch (reconnectAction) {
  case ReconnectNextAction.NONE:
    dispatcher.dispatch('c_browser');
    break;
  case ReconnectNextAction.GAME:
    dispatcher.dispatch('c_game', res[AjaxResponse.GAME_ID]);
    break;
  default:
    console.warn(`Unhandled ReconnectNextAction: ${reconnectAction}`);
  }
}

let hasRetriedFirstLoad = false;
export function handleError(res, req, dispatcher) {
  if (res[AjaxResponse.ERROR_CODE] === ErrorCode.SESSION_EXPIRED && !hasRetriedFirstLoad) {
    hasRetriedFirstLoad = true;
    invokeFirstLoad();
  } else {
    dispatcher.dispatch(`${AjaxOperation.REGISTER}Error`, res, req);
  }
}
