
import { observable } from "mobx";
import { Card_Object } from "../object-models/card.object";
import { dataService } from "./data.service";

export const cardsService = observable({
  cards: <Card_Object[]>[],
  addCard: (card: Card_Object) =>
    dataService.add('Card', card),
  deleteCard: (card: Card_Object) =>
    dataService.deleteData('Card', card),
  updateCard: (card: Card_Object) =>
    dataService.update('Card', card)
})

dataService.data$('Cards', (cards: Card_Object[]) => {
  cardsService.cards = cards
  window['cards'] = cards
})
