import { dispatch } from '../dispatcher';

export class Message {
  constructor({ time, text, author }) {
    const p = n => n < 10 ? `0${n}` : n;
    const dt = new Date(time);

    this._time = `${p(dt.getHours())}:${p(dt.getMinutes())}:${p(dt.getSeconds())}`;
    this._text = text;
    this._author = author;
  }

  get time() { return this._time; }
  get text() { return this._text; }
  get author() { return this._author; }
}

class ChatStore {
  constructor() {
    this._names = new Set();
    this._messages = [];
  }

  getNames() {
    return [...this._names];
  }
  addNames(names) {
    const size = this._names.size;

    names.forEach(name => this._names.add(name));

    if (this._names.size !== size) {
      dispatch('names');
    }
  }
  removeNames(names) {
    const size = this._names.size;

    names.forEach(name => this._names.delete(name));

    if (this._names.size !== size) {
      dispatch('names');
    }
  }

  getMessages() {
    return [...this._messages];
  }
  addMessage(message) {
    this._messages.push(message);
    dispatch('messages');
  }
}

const store = new ChatStore();

export default store;
