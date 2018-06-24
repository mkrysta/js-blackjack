class Card {
    constructor(cardSuit, cardValue) {
        this._cardSuit = cardSuit;
        this._cardValue = cardValue;
    }

    get name() {
        return this._cardValue.valueName + " " + this._cardSuit.suitName;
    }

    get points() {
        let result = this._cardValue.value;
        //All above 10 is 10
        if (result > 10) {
            result = 10;
        }

        return result;
    }

    get value() {
        return this._cardValue.value;
    }

    get valueName() {
        return this._cardValue.valueName;
    }

    get suit() {
        this._cardSuit.suit;
    }
}

export default Card;