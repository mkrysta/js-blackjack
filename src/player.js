class Player {
    constructor(name, deck) {
        this._deck = deck;
        this._cards = [];
        this._name = name;
    }

    getNewCardFromDeck() {
        let newCard = this._deck.getNextCard();
        this._cards.push(newCard);
    }

    get name() {
        return this._name;
    }

    get cards() {
        return this._cards;
    }

    showAll() {
        let result = "";
        result += this._name + "\n";
        this._cards.forEach(card => {
            result += card.name + "\n";
        });

        return result;
    }
}

export default Player;