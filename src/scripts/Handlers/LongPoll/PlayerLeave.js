import { LongPollResponse } from '../../constants';
import chatStore from '../../Models/Chat';

export default function handle(res) {
  const name = res[LongPollResponse.NICKNAME];

  chatStore.removeNames([name]);
}
