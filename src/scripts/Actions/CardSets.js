import { CardSetData } from '../constants';
import CardSet from '../Models/CardSet';
import { add, clear } from '../Models/CardSet';

import { dispatch } from '../dispatcher';

export default function(rawCardSets) {
  clear();
  rawCardSets.map(raw => new CardSet({
    id: raw[CardSetData.ID],
    name: raw[CardSetData.CARD_SET_NAME],
    description: raw[CardSetData.CARD_SET_DESCRIPTION],
    baseDeck: raw[CardSetData.BASE_DECK],
    weight: raw[CardSetData.WEIGHT],
    numBlackCards: raw[CardSetData.BLACK_CARDS_IN_DECK],
    numWhiteCards: raw[CardSetData.WHITE_CARDS_IN_DECK],
  })).forEach(cardSet => add(cardSet));

  dispatch('cardSets');
}
