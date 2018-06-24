import CardSuit from "./cardSuit";
import CardValue from "./cardValue";
import Card from "./card";

class Deck {
    constructor() {
        let suits = CardSuit.getAllCardSuits();//getCardSuits();
        let values = CardValue.getAllCardValues()//getCardValues();
        this._cardStack = [];
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
                let card = new Card(suits[suitIndex], values[valueIndex]);
                this._cardStack.push(card);
            }
        }
    }

    /*
    printAllCards() {
        for(let i = 0; i < this._cards.length; i++) {
            console.log(this._cards[i].name);
        }
    }
    */

    shuffleCards() {
        for(let cardIndex = 0; cardIndex < this._cardStack.length; cardIndex++) {
            let randomCardIndex = this._getRandomCardIndex();
            this._swapCards(cardIndex, randomCardIndex);
        }
    }

    _getRandomCardIndex() {
        return Math.trunc(Math.random() * this._cardStack.length);
    }

    _swapCards(sourceIndex, destIndex) {
        if (sourceIndex !== destIndex) {
            let card = this._cardStack[destIndex];
            this._cardStack[destIndex] = this._cardStack[sourceIndex];
            this._cardStack[sourceIndex] = card;
        }
    }

    getNextCard() {
        return this._cardStack.shift();
    }
}

export default Deck;