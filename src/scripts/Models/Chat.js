import { dispatch } from '../dispatcher';

class ChatStore {
  constructor() {
    this._names = new Set();
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
    names.forEach(name => this._names.delete(name));
  }
}

const store = new ChatStore();

export default store;
