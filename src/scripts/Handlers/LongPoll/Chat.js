import { LongPollResponse } from '../../constants';
import chatStore, { Message } from '../../Models/Chat';

export default function handle(res) {
  const time = res[LongPollResponse.TIMESTAMP];
  const message = res[LongPollResponse.MESSAGE];
  const author = res[LongPollResponse.FROM];
  const admin = res[LongPollResponse.FROM_ADMIN];

  chatStore.addMessage(new Message({
    time: time,
    text: message,
    author: author,

    className: admin ? 'message--admin' : '',
  }));
}
