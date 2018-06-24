import GameStates from "./gameStates";
import GameResults from "./gameResults";
import Deck from "./deck";
import Player from "./player";
import CardValues from "./cardValues";

const MAX_SCORE = 21;
const ACE_BONUS_SCORE = 10;

class Game {
    constructor() {
        this._gameState = GameStates.started;
        this._gameResult = GameResults.notKnown;
        this._deck = new Deck();
        this._deck.shuffleCards();
        this._humanPlayer = new Player("Gracz", this._deck);
        this._dealerPlayer = new Player("Diler", this._deck);
    }

    get gameResult() {
        return this._gameResult;
    }

    get gameState() {
        return this._gameState;
    }

    gameResultDescription() {
        let result = "";
        switch(this._gameResult) {
            case GameResults.dealerWon:
                result = "WYGRAŁ DEALER !!!";
                break;
            case GameResults.playerWon:
                result = "WYGRAŁ GRACZ !!!";
                break;
            case GameResults.draw:
                result = "REMIS !!!";
                break;
            case GameResults.notKnown:
                result = "Nic nie jest jeszcze przesądzone...";
                break;
            default:
                result = "Nieoczekiwany wynik";
                break;
        }

        return result;
    }

    gameStateDescription() {
        let result = "";
        switch(this._gameState) {
            case GameStates.started:
                result = "Nowa gra rozpoczęta";
                break;
            case GameStates.pas:
                result = "Pas";
                break;
            case GameStates.over:
                result = "Gra skończona";
                break;
            default:
                result = "Nieoczekiwany stan gry";
                break;
        }

        return result;
    }

    gameDescription() {
        let result = "";
        result += this.gameStateDescription() + "\n";
        result += this._humanPlayer.showAll();
        result += "Wynik:" + this.getPlayerScore() + "\n";
        result += "================================================================\n";
        result += this._dealerPlayer.showAll();
        result += "Wynik:" + this.getDealerScore() + "\n";
        result += "\n"
        result += this.gameResultDescription();

        //console.log(this.gameStateDescription(), this.gameResultDescription());

        return result;
    }

    humanPlayerMove() {
        if (this._gameState === GameStates.started) {
            this._humanPlayer.getNewCardFromDeck();
            this._updateState();
        }
        else {
            throw "Can't move";
        }

    }

    _dealerPlayerMove() {
        if (this._gameState === GameStates.pas) {
            let targetScore = this.getPlayerScore() + 1;
            if (targetScore > MAX_SCORE) {
                targetScore = MAX_SCORE;
            }
            while (this.getDealerScore() < targetScore) {
                this._dealerPlayer.getNewCardFromDeck();
            }
        }
        else {
            throw "Game should be in 'Pas' state.";
        }

    }

    _getScore(player) {
        let result = 0;
        let hasAce = false;
        player.cards.forEach(card => {
            result += card.points;
            if (card.value === CardValues.ace) {
                hasAce = true;
            }
            //console.log(card.value, card.valueName, card.points, hasAce, CardValues.ace);
        });
        //Add bonus score if has ace and it will not exceeds MAX_SCORE
        if (hasAce && result + ACE_BONUS_SCORE <= MAX_SCORE) {
            result += ACE_BONUS_SCORE;
        }

        return result;
    }

    getPlayerScore() {
        return this._getScore(this._humanPlayer);
    }

    getDealerScore() {
        return this._getScore(this._dealerPlayer);
    }

    playerPass() {
        if (this._gameState === GameStates.started) {
            this._gameState = GameStates.pas;
            this._dealerPlayerMove();
            this._updateState();
        }
        else {
            throw "Can't move";
        }

    }

    _changeState(playerCardsCount, dealerCardsCount, isPlayerWon, isDealerWon) {
        //Potential draw, player with more cards wins
        if (isPlayerWon && isDealerWon) {
            if (playerCardsCount > dealerCardsCount) {
                this._gameResult = GameResults.playerWon;
            }
            else if (playerCardsCount < dealerCardsCount) {
                this._gameResult = GameResults.dealerWon;
            }
            else {
                this._gameResult = GameResults.draw;
            }
        }
        else if(isPlayerWon) {
            this._gameResult = GameResults.playerWon;
        }
        else if(isDealerWon) {
            this._gameResult = GameResults.dealerWon;
        }
    }

    _updateState() {
        let playerScore = this.getPlayerScore();
        let dealerScore = this.getDealerScore();
        let playerCardsCount = this._humanPlayer.cards.length;
        let dealerCardsCount = this._dealerPlayer.cards.length;
        let isPlayerWon = (playerScore <= MAX_SCORE) && ((playerScore === MAX_SCORE) || (dealerScore > MAX_SCORE));
        let isDealerWon = (dealerScore <= MAX_SCORE) && ((dealerScore === MAX_SCORE) || (playerScore > MAX_SCORE));
        this._changeState(playerCardsCount, dealerCardsCount, isPlayerWon, isDealerWon);
        if (this._gameState === GameStates.pas && this._gameResult === GameResults.notKnown) {
            isPlayerWon = (playerScore >= dealerScore);
            isDealerWon = (playerScore <= dealerScore);
            this._changeState(playerCardsCount, dealerCardsCount, isPlayerWon, isDealerWon);
        }
        if (this._gameResult !== GameResults.notKnown) {
            this._gameState = GameStates.over;
        }
    }
}

export default Game;