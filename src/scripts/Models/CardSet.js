const store = { };

export default class CardSet {
  constructor(data) {
    this._data = data;
  }

  get id() { return this._data.id; }
  get name() { return this._data.name; }
  get description() { return this._data.description; }
  get baseDeck() { return this._data.baseDeck; }
  get weight() { return this._data.weight; }
  get numBlackCards() { return this._data.numBlackCards; }
  get numWhiteCards() { return this._data.numWhiteCards; }
}

export function get(id = null) {
  if (id === null) {
    return Object.keys(store).map(key => store[key]);
  }

  return store[id];
}
export function add(cardSet) {
  store[cardSet.id] = cardSet;
}
export function clear() {
  const keys = Object.keys(store);

  keys.forEach(key => delete store[key]);
}
