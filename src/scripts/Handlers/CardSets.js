import { AjaxResponse } from '../../constants';

import handleCardSets from '../../Actions/CardSets';

export default function handle(res, req, dispatcher) {
  handleCardSets(res[AjaxResponse.CARD_SETS]);

  if (res[AjaxResponse.IN_PROGRESS] !== true) {
    dispatcher.dispatch('register');
  } else {
    // rejoin game
    throw new Error('NIE - reconnect');
  }
}
