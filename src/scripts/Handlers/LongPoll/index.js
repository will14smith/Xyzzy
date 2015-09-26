import { LongPollEvent, LongPollResponse } from '../../constants';

function success(data, dispatcher) {
  if (data[LongPollResponse.TIMESTAMP] || data[LongPollResponse.ERROR]) {
    // try again with an array...
    return success([data], dispatcher);
  }

  data.forEach(message => {
    const op = message[LongPollResponse.EVENT];

    dispatcher.dispatch(`lp_${op}`, message);
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

import chat from './Chat';
import gameListRefresh from './GameListRefresh';
import gameOptionsChanged from './GameOptionsChanged';
import gamePlayerJoin from './GamePlayerJoin';
import gamePlayerLeave from './GamePlayerLeave';
import gameSpectatorJoin from './GameSpectatorJoin';
import gameSpectatorLeave from './GameSpectatorLeave';
import newPlayer from './NewPlayer';
import playerLeave from './PlayerLeave';

export function init(dispatcher) {
  dispatcher.on('longPollResponse', success);
  dispatcher.on('longPollError', error);

  handle(dispatcher, LongPollEvent.NOOP, () => {});

  handle(dispatcher, LongPollEvent.CHAT, chat);
  handle(dispatcher, LongPollEvent.GAME_LIST_REFRESH, gameListRefresh);
  handle(dispatcher, LongPollEvent.GAME_OPTIONS_CHANGED, gameOptionsChanged);
  handle(dispatcher, LongPollEvent.GAME_PLAYER_JOIN, gamePlayerJoin);
  handle(dispatcher, LongPollEvent.GAME_PLAYER_LEAVE, gamePlayerLeave);
  handle(dispatcher, LongPollEvent.GAME_SPECTATOR_JOIN, gameSpectatorJoin);
  handle(dispatcher, LongPollEvent.GAME_SPECTATOR_LEAVE, gameSpectatorLeave);
  handle(dispatcher, LongPollEvent.NEW_PLAYER, newPlayer);
  handle(dispatcher, LongPollEvent.PLAYER_LEAVE, playerLeave);
}
