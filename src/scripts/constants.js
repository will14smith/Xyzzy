// from https://github.com/ajanata/PretendYoureXyzzy/blob/master/WebContent/js/cah.js

const GamePlayerStatus = {};
GamePlayerStatus.SPECTATOR = 'sv';
GamePlayerStatus.HOST = 'sh';
GamePlayerStatus.IDLE = 'si';
GamePlayerStatus.WINNER = 'sw';
GamePlayerStatus.PLAYING = 'sp';
GamePlayerStatus.JUDGE = 'sj';
GamePlayerStatus.JUDGING = 'sjj';
const GamePlayerStatusText = {};
GamePlayerStatusText.sp = 'Playing';
GamePlayerStatusText.sv = 'Spectator';
GamePlayerStatusText.sh = 'Host';
GamePlayerStatusText.sw = 'Winner!';
GamePlayerStatusText.sj = 'Card Czar';
GamePlayerStatusText.sjj = 'Selecting';
GamePlayerStatusText.si = '';

const GamePlayerStatusMessage = {};
GamePlayerStatusMessage.sp = 'Select a card to play.';
GamePlayerStatusMessage.sv = 'You are just spectating.';
GamePlayerStatusMessage.sh = 'Wait for players then click Start Game.';
GamePlayerStatusMessage.sw = 'You have won!';
GamePlayerStatusMessage.sj = 'You are the Card Czar.';
GamePlayerStatusMessage.sjj = 'Select a winning card.';
GamePlayerStatusMessage.si = 'Waiting for players...';

const GamePlayerInfo = {};
GamePlayerInfo.NAME = 'N';
GamePlayerInfo.SCORE = 'sc';
GamePlayerInfo.STATUS = 'st';

const GameOptionData = {};
GameOptionData.USE_TIMER = 'ut';
GameOptionData.CARD_SETS = 'css';
GameOptionData.BLANKS_LIMIT = 'bl';
GameOptionData.SPECTATOR_LIMIT = 'vL';
GameOptionData.PLAYER_LIMIT = 'pL';
GameOptionData.PASSWORD = 'pw';
GameOptionData.SCORE_LIMIT = 'sl';

const GameInfo = {};
GameInfo.HOST = 'H';
GameInfo.STATE = 'S';
GameInfo.PLAYERS = 'P';
GameInfo.SPECTATORS = 'V';
GameInfo.ID = 'gid';
GameInfo.GAME_OPTIONS = 'go';
GameInfo.HAS_PASSWORD = 'hp';

const GameState = {};
GameState.PLAYING = 'p';
GameState.ROUND_OVER = 'ro';
GameState.LOBBY = 'l';
GameState.JUDGING = 'j';
GameState.DEALING = 'd';

const GameStateText = {};
GameStateText.ro = 'In Progress';
GameStateText.d = 'In Progress';
GameStateText.p = 'In Progress';
GameStateText.l = 'Not Started';
GameStateText.j = 'In Progress';

const CardSetData = {};
CardSetData.CARD_SET_DESCRIPTION = 'csd';
CardSetData.WEIGHT = 'w';
CardSetData.CARD_SET_NAME = 'csn';
CardSetData.ID = 'cid';
CardSetData.WHITE_CARDS_IN_DECK = 'wcid';
CardSetData.BLACK_CARDS_IN_DECK = 'bcid';
CardSetData.BASE_DECK = 'bd';

const BlackCardData = {};
BlackCardData.TEXT = 'T';
BlackCardData.PICK = 'PK';
BlackCardData.ID = 'cid';
BlackCardData.WATERMARK = 'W';
BlackCardData.DRAW = 'D';

const WhiteCardData = {};
WhiteCardData.WRITE_IN = 'wi';
WhiteCardData.TEXT = 'T';
WhiteCardData.ID = 'cid';
WhiteCardData.WATERMARK = 'W';

const LongPollResponse = {};
LongPollResponse.WALL = 'wall';
LongPollResponse.WHITE_CARDS = 'wc';
LongPollResponse.REASON = 'qr';
LongPollResponse.GAME_ID = 'gid';
LongPollResponse.EMOTE = 'me';
LongPollResponse.HAND = 'h';
LongPollResponse.INTERMISSION = 'i';
LongPollResponse.PLAYER_INFO = 'pi';
LongPollResponse.BLACK_CARD = 'bc';
LongPollResponse.WINNING_CARD = 'WC';
LongPollResponse.GAME_STATE = 'gs';
LongPollResponse.NICKNAME = 'n';
LongPollResponse.CARDCAST_DECK_INFO = 'cdi';
LongPollResponse.PLAY_TIMER = 'Pt';
LongPollResponse.MESSAGE = 'm';
LongPollResponse.FROM_ADMIN = 'fa';
LongPollResponse.GAME_INFO = 'gi';
LongPollResponse.ERROR = 'e';
LongPollResponse.EVENT = 'E';
LongPollResponse.FROM = 'f';
LongPollResponse.ERROR_CODE = 'ec';
LongPollResponse.TIMESTAMP = 'ts';
LongPollResponse.ROUND_WINNER = 'rw';

const LongPollEvent = {};
LongPollEvent.KICKED = 'k';
LongPollEvent.HURRY_UP = 'hu';
LongPollEvent.GAME_JUDGE_SKIPPED = 'gjs';
LongPollEvent.GAME_PLAYER_LEAVE = 'gpl';
LongPollEvent.KICKED_FROM_GAME_IDLE = 'kfgi';
LongPollEvent.GAME_ROUND_COMPLETE = 'grc';
LongPollEvent.GAME_STATE_CHANGE = 'gsc';
LongPollEvent.GAME_OPTIONS_CHANGED = 'goc';
LongPollEvent.GAME_PLAYER_SKIPPED = 'gps';
LongPollEvent.CHAT = 'c';
LongPollEvent.BANNED = 'B&';
LongPollEvent.GAME_SPECTATOR_LEAVE = 'gvl';
LongPollEvent.CARDCAST_ADD_CARDSET = 'cac';
LongPollEvent.NEW_PLAYER = 'np';
LongPollEvent.GAME_PLAYER_JOIN = 'gpj';
LongPollEvent.GAME_SPECTATOR_JOIN = 'gvj';
LongPollEvent.GAME_LIST_REFRESH = 'glr';
LongPollEvent.NOOP = '_';
LongPollEvent.GAME_PLAYER_KICKED_IDLE = 'gpki';
LongPollEvent.GAME_PLAYER_INFO_CHANGE = 'gpic';
LongPollEvent.CARDCAST_REMOVE_CARDSET = 'crc';
LongPollEvent.GAME_BLACK_RESHUFFLE = 'gbr';
LongPollEvent.GAME_WHITE_RESHUFFLE = 'gwr';
LongPollEvent.PLAYER_LEAVE = 'pl';
LongPollEvent.HAND_DEAL = 'hd';
LongPollEvent.GAME_JUDGE_LEFT = 'gjl';

const ErrorCode = {};
ErrorCode.TOO_MANY_GAMES = 'tmg';
ErrorCode.NO_CARD_SPECIFIED = 'ncs';
ErrorCode.ACCESS_DENIED = 'ad';
ErrorCode.NOT_GAME_HOST = 'ngh';
ErrorCode.CANNOT_JOIN_ANOTHER_GAME = 'cjag';
ErrorCode.INVALID_CARD = 'ic';
ErrorCode.RESERVED_NICK = 'rn';
ErrorCode.TOO_MANY_USERS = 'tmu';
ErrorCode.NO_GAME_SPECIFIED = 'ngs';
ErrorCode.SESSION_EXPIRED = 'se';
ErrorCode.CARDCAST_INVALID_ID = 'cii';
ErrorCode.BAD_OP = 'bo';
ErrorCode.TOO_FAST = 'tf';
ErrorCode.NO_SESSION = 'ns';
ErrorCode.NOT_REGISTERED = 'nr';
ErrorCode.OP_NOT_SPECIFIED = 'ons';
ErrorCode.NOT_JUDGE = 'nj';
ErrorCode.WRONG_PASSWORD = 'wp';
ErrorCode.NOT_IN_THAT_GAME = 'nitg';
ErrorCode.NICK_IN_USE = 'niu';
ErrorCode.SERVER_ERROR = 'serr';
ErrorCode.GAME_FULL = 'gf';
ErrorCode.NO_NICK_SPECIFIED = 'nns';
ErrorCode.NOT_ADMIN = 'na';
ErrorCode.NOT_YOUR_TURN = 'nyt';
ErrorCode.BANNED = 'B&';
ErrorCode.INVALID_NICK = 'in';
ErrorCode.ALREADY_STARTED = 'as';
ErrorCode.BAD_REQUEST = 'br';
ErrorCode.NO_SUCH_USER = 'nsu';
ErrorCode.DO_NOT_HAVE_CARD = 'dnhc';
ErrorCode.MESSAGE_TOO_LONG = 'mtl';
ErrorCode.ALREADY_STOPPED = 'aS';
ErrorCode.NOT_ENOUGH_PLAYERS = 'nep';
ErrorCode.INVALID_GAME = 'ig';
ErrorCode.CARDCAST_CANNOT_FIND = 'ccf';
ErrorCode.NO_MSG_SPECIFIED = 'nms';
ErrorCode.NOT_ENOUGH_CARDS = 'nec';

const ErrorCodeText = {};
ErrorCodeText.tmg = 'There are too many games already in progress. Either join an existing game, or wait for one to become available.';
ErrorCodeText.ncs = 'No card specified.';
ErrorCodeText.ns = 'Session not detected. Make sure you have cookies enabled.';
ErrorCodeText.rn = 'That nick is reserved.';
ErrorCodeText.nr = 'Not registered. Refresh the page.';
ErrorCodeText.nitg = 'You are not in that game.';
ErrorCodeText.nep = 'There are not enough players to start the game.';
ErrorCodeText.tf = 'You are chatting too fast. Wait a few seconds and try again.';
ErrorCodeText.nyt = 'It is not your turn to play a card.';
ErrorCodeText.gf = 'That game is full. Join another.';
ErrorCodeText.aS = 'The game has already stopped.';
ErrorCodeText.mtl = 'Messages cannot be longer than 200 characters.';
ErrorCodeText.br = 'Bad request.';
ErrorCodeText.ngs = 'No game specified.';
ErrorCodeText.ic = 'Invalid card specified.';
ErrorCodeText.bo = 'Invalid operation.';
ErrorCodeText.tmu = 'There are too many users connected. Either join another server, or wait for a user to disconnect.';
ErrorCodeText.dnhc = 'You don\'t have that card.';
ErrorCodeText.ons = 'Operation not specified.';
ErrorCodeText.cjag = 'You cannot join another game.';
ErrorCodeText.ig = 'Invalid game specified.';
ErrorCodeText.nns = 'No nickname specified.';
ErrorCodeText.cii = 'Invalid Cardcast ID. Must be exactly 5 characters.';
ErrorCodeText.ngh = 'Only the game host can do that.';
ErrorCodeText.nec = 'You must add card sets containing at least 50 black cards and 20 times the player limit white cards.';
ErrorCodeText.serr = 'An error occured on the server.';
ErrorCodeText.ccf = 'Cannot find Cardcast deck with given ID. If you just added this deck to Cardcast, wait a few minutes and try again.';
ErrorCodeText.nsu = 'No such user.';
ErrorCodeText.wp = 'That password is incorrect.';
ErrorCodeText.as = 'The game has already started.';
ErrorCodeText.se = 'Your session has expired. Refresh the page.';
ErrorCodeText.in = 'Nickname must contain only upper and lower case letters, numbers, or underscores, must be 3 to 30 characters long, and must not start with a number.';
ErrorCodeText.nms = 'No message specified.';
ErrorCodeText.na = 'You are not an administrator.';
ErrorCodeText.niu = 'Nickname is already in use.';
ErrorCodeText['B&'] = 'Banned.';
ErrorCodeText.ad = 'Access denied.';
ErrorCodeText.nj = 'You are not the judge.';

const ErrorInformation = {};
ErrorInformation.WHITE_CARDS_REQUIRED = 'wcr';
ErrorInformation.WHITE_CARDS_PRESENT = 'wcp';
ErrorInformation.BLACK_CARDS_REQUIRED = 'bcr';
ErrorInformation.BLACK_CARDS_PRESENT = 'bcp';

const AjaxResponse = {};
AjaxResponse.WHITE_CARDS = 'wc';
AjaxResponse.CARD_SETS = 'css';
AjaxResponse.GAME_ID = 'gid';
AjaxResponse.HAND = 'h';
AjaxResponse.PLAYER_INFO = 'pi';
AjaxResponse.BLACK_CARD = 'bc';
AjaxResponse.GAME_OPTIONS = 'go';
AjaxResponse.IN_PROGRESS = 'ip';
AjaxResponse.GAMES = 'gl';
AjaxResponse.NICKNAME = 'n';
AjaxResponse.CARD_ID = 'cid';
AjaxResponse.NEXT = 'next';
AjaxResponse.GAME_INFO = 'gi';
AjaxResponse.ERROR = 'e';
AjaxResponse.ERROR_CODE = 'ec';
AjaxResponse.SERIAL = 's';
AjaxResponse.MAX_GAMES = 'mg';
AjaxResponse.NAMES = 'nl';

const AjaxRequest = {};
AjaxRequest.WALL = 'wall';
AjaxRequest.MESSAGE = 'm';
AjaxRequest.CARD_ID = 'cid';
AjaxRequest.GAME_ID = 'gid';
AjaxRequest.EMOTE = 'me';
AjaxRequest.CARDCAST_ID = 'cci';
AjaxRequest.GAME_OPTIONS = 'go';
AjaxRequest.SERIAL = 's';
AjaxRequest.PASSWORD = 'pw';
AjaxRequest.OP = 'o';
AjaxRequest.NICKNAME = 'n';

const AjaxOperation = {};
AjaxOperation.FIRST_LOAD = 'fl';
AjaxOperation.START_GAME = 'sg';
AjaxOperation.JUDGE_SELECT = 'js';
AjaxOperation.LOG_OUT = 'lo';
AjaxOperation.GAME_LIST = 'ggl';
AjaxOperation.CHANGE_GAME_OPTIONS = 'cgo';
AjaxOperation.PLAY_CARD = 'pc';
AjaxOperation.CREATE_GAME = 'cg';
AjaxOperation.CARDCAST_LIST_CARDSETS = 'clc';
AjaxOperation.GAME_CHAT = 'GC';
AjaxOperation.KICK = 'K';
AjaxOperation.ADMIN_SET_VERBOSE_LOG = 'svl';
AjaxOperation.GET_CARDS = 'gc';
AjaxOperation.JOIN_GAME = 'jg';
AjaxOperation.CHAT = 'c';
AjaxOperation.NAMES = 'gn';
AjaxOperation.SPECTATE_GAME = 'vg';
AjaxOperation.BAN = 'b';
AjaxOperation.SCORE = 'SC';
AjaxOperation.GET_GAME_INFO = 'ggi';
AjaxOperation.CARDCAST_ADD_CARDSET = 'cac';
AjaxOperation.CARDCAST_REMOVE_CARDSET = 'crc';
AjaxOperation.REGISTER = 'r';
AjaxOperation.STOP_GAME = 'Sg';
AjaxOperation.LEAVE_GAME = 'lg';

const ReconnectNextAction = {};
ReconnectNextAction.GAME = 'game';
ReconnectNextAction.NONE = 'none';

const DisconnectReason = {};
DisconnectReason.BANNED = 'B&';
DisconnectReason.PING_TIMEOUT = 'pt';
DisconnectReason.KICKED = 'k';
DisconnectReason.MANUAL = 'man';
DisconnectReason.IDLE_TIMEOUT = 'it';

export {
  GamePlayerStatus,
  GamePlayerStatusText,
  GamePlayerStatusMessage,
  GamePlayerInfo,
  GameOptionData,
  GameInfo,
  GameState,
  GameStateText,
  CardSetData,
  BlackCardData,
  WhiteCardData,
  LongPollResponse,
  LongPollEvent,
  ErrorCode,
  ErrorCodeText,
  ErrorInformation,
  AjaxResponse,
  AjaxRequest,
  AjaxOperation,
  ReconnectNextAction,
  DisconnectReason,
};
