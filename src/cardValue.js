import CardValues from "./cardValues";

class CardValue {
    constructor(value) {
        this._value = value
        switch (this._value) {
            case CardValues.ace:
                this._valueName = "As";
                break;
            case CardValues.king:
                this._valueName = "Król";
                break;
            case CardValues.queen:
                this._valueName = "Królowa";
                break;
            case CardValues.jack:
                this._valueName = "Walet";
                break;
            case CardValues.ten:
                this._valueName = "Dziesiątka";
                break;
            case CardValues.nine:
                this._valueName = "Dziewiątka";
                break;
            case CardValues.eight:
                this._valueName = "Ósemka";
                break;
            case CardValues.seven:
                this._valueName = "Siódemka";
                break;
            case CardValues.six:
                this._valueName = "Szóstka";
                break;
            case CardValues.five:
                this._valueName = "Piątka";
                break;
            case CardValues.four:
                this._valueName = "Czwórka";
                break;
            case CardValues.three:
                this._valueName = "Trójka";
                break;
            case CardValues.two:
                this._valueName = "Dwójka";
                break;
            default:
                throw "Invalid card value!";
        }
    }

    get value() {
        return this._value;
    }

    get valueName() {
        return this._valueName;
    }

    static getAllCardValues() {
        let result = [
            new CardValue(CardValues.ace),
            new CardValue(CardValues.king),
            new CardValue(CardValues.queen),
            new CardValue(CardValues.jack),
            new CardValue(CardValues.ten),
            new CardValue(CardValues.nine),
            new CardValue(CardValues.eight),
            new CardValue(CardValues.seven),
            new CardValue(CardValues.six),
            new CardValue(CardValues.five),
            new CardValue(CardValues.four),
            new CardValue(CardValues.three),
            new CardValue(CardValues.two)
        ];

        return result;
    }
}

export default CardValue;