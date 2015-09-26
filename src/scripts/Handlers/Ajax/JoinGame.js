import { AjaxRequest } from '../../constants';

export default function handle(res, req, dispatcher) {
  dispatcher.dispatch('c_game', req.get(AjaxRequest.GAME_ID));
}
