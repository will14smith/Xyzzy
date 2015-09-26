import { AjaxResponse, ErrorCode, ErrorCodeText, ErrorInformation } from '../../constants';
import { error as logError } from '../../utils';

export default function handle() {
  // NOOP
}

export function handleError(res) {
  if (res[AjaxResponse.ERROR_CODE] !== ErrorCode.NOT_ENOUGH_CARDS) {
    return logError(ErrorCodeText[res[AjaxResponse.ERROR_CODE]]);
  }

  const msg = `With current settings, the game requires
${res[ErrorInformation.BLACK_CARDS_REQUIRED]} black cards and
${res[ErrorInformation.WHITE_CARDS_REQUIRED]} white cards, but only has
${res[ErrorInformation.BLACK_CARDS_PRESENT]} black cards and
${res[ErrorInformation.WHITE_CARDS_PRESENT]} white cards.`;

  logError(msg);
}
