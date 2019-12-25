# Memory Game Project

## What is it?

This is an electronic  version of the traditional memory matching game. The game consists of 16 cards ( 8 pairs ).
Your challenge is to match all cards with less moves and in less time.


## How it this built?

* The game is built using only HTML, CSS, and JavaScript.
* To shuffle cards randomly, it uses the shuffle function from: http://stackoverflow.com/a/2450976
* To listen to a click, we should set eventListeners for all the cards:
```
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCardSymbol);
    card.addEventListener("click", compareCards);
    card.addEventListener("click",congrats);
};
```
* For Score Panel, the game keeps track of moves made and the time spent through the whole game.
* Based on your moves, you will get star ratings.
