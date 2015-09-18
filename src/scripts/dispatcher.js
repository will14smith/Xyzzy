import { EventEmitter } from 'events';

class Dispatcher {
  constructor() {
    this._emitter = new EventEmitter();
  }

  on(event, fn) {
    this._emitter.on(event, fn);
  }
  off(event, fn) {
    this._emitter.off(event, fn);
  }

  dispatch(event, ...args) {
    if (this._emitter.emit(event, ...args, this) !== true) {
      console.warn(`There are no listeners to ${event}.`);
    }
  }
}

const dispatcher = new Dispatcher();

export default dispatcher;

export function on(...args) { return dispatcher.on(...args); }
export function off(...args) { return dispatcher.off(...args); }
export function dispatch(...args) { return dispatcher.dispatch(...args); }
