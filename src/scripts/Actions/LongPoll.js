import { ajaxRequest as ajax } from '../utils';
import { dispatch } from '../dispatcher';

const BACKOFF_SAFE = 500;
const BACKOFF_NORMAL = 1;
const BACKOFF_FACTOR = 2;

let backoff = BACKOFF_SAFE;

function reschedule(fn, success) {
  if (success) {
    backoff = BACKOFF_NORMAL;
  } else if (backoff < BACKOFF_SAFE) {
    backoff = BACKOFF_SAFE;
  } else {
    backoff *= BACKOFF_FACTOR;
  }

  setTimeout(fn, backoff);
}

export default function run() {
  ajax({
    method: 'POST',
    url: '/zy/LongPollServlet',
  }).then(data => {
    dispatch('longPollResponse', data);
    reschedule(run, true);
  }, error => {
    dispatch('longPollError', error);
    reschedule(run, false);
  });
}
