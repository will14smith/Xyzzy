import { AjaxResponse } from '../../constants';

export default function handle(res, req, dispatcher) {
  dispatcher.dispatch('c_game', res[AjaxResponse.GAME_ID]);
}
