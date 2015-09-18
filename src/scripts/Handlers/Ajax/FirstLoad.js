import { AjaxResponse } from '../../constants';
import handleCardSets from '../../Actions/CardSets';

export default function handle(res, req, dispatcher) {
  handleCardSets(res[AjaxResponse.CARD_SETS]);

  console.log(res, req);

  if (res[AjaxResponse.IN_PROGRESS] !== true) {
    dispatcher.dispatch('c_register');
  } else {
    // rejoin game
    throw new Error('NIE - reconnect');
  }
}
