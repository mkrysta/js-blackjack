import CardSuits from './cardSuits';

class CardSuit {
    constructor(suit) {
        this._suit = suit
        switch (this._suit) {
            case CardSuits.spades:
                this._suitName = "Pik"
                break;
            case CardSuits.hearts:
                this._suitName = "Kier"
                break;
            case CardSuits.diamonds:
                this._suitName = "Karo"
                break;
            case CardSuits.clubs:
                this._suitName = "Trefl"
                break;
            default:
                throw "Invalid card suit!";
        }
    }

    get suit() {
        return this._suit;
    }

    get suitName() {
        return this._suitName;
    }

    static getAllCardSuits() {
        let result = [
            new CardSuit(CardSuits.spades),
            new CardSuit(CardSuits.hearts),
            new CardSuit(CardSuits.diamonds),
            new CardSuit(CardSuits.clubs)
        ];

        return result;
    }
}

export default CardSuit;