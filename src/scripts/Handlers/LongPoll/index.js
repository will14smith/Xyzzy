import { LongPollResponse } from '../../constants';

function success(data, dispatcher) {
  if (data[LongPollResponse.TIMESTAMP] || data[LongPollResponse.ERROR]) {
    // try again with an array...
    return success([data]);
  }

  data.forEach(message => {
    const op = message[LongPollResponse.EVENT];

    dispatcher.dispatch(`lp_${op}`, data);
  });
}

function error(data) {
  console.error(data);
}

function handle(dispatcher, op, successFn, errorFn) {
  if (successFn) {
    dispatcher.on(`lp_${op}`, successFn);
  }
  if (errorFn) {
    dispatcher.on(`lpe_${op}LongPollError`, errorFn);
  }
}

export function init(dispatcher) {
  dispatcher.on('longPollResponse', success);
  dispatcher.on('longPollError', error);
}
