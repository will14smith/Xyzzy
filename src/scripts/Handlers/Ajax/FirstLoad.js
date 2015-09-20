import { AjaxResponse, AjaxOperation, ErrorCode, ReconnectNextAction } from '../../constants';
import invokeFirstLoad from '../../Actions/FirstLoad';
import handleCardSets from '../../Actions/CardSets';
import handleRegister from './Register';

export default function handle(res, req, dispatcher) {
  handleCardSets(res[AjaxResponse.CARD_SETS]);

  if (res[AjaxResponse.IN_PROGRESS] !== true) {
    return dispatcher.dispatch('c_register');
  }

  handleRegister(res, req, dispatcher);

  const reconnectAction = res[AjaxResponse.NEXT];
  switch (reconnectAction) {
  case ReconnectNextAction.NONE:
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
