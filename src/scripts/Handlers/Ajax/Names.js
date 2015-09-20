import { AjaxResponse } from '../../constants';
import chatStore from '../../Models/Chat';

export default function handle(res) {
  const names = res[AjaxResponse.NAMES];

  chatStore.addNames(names);
}
