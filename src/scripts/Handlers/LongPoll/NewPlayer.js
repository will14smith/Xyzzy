import { LongPollResponse } from '../../constants';
import { log } from '../../utils';

import chatStore from '../../Models/Chat';

export default function handle(res) {
  const name = res[LongPollResponse.NICKNAME];

  log(`${name} has connected.`);

  chatStore.addNames([name]);
}
