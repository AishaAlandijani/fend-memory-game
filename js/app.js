//The list of all Cards and its deck
let card = document.getElementsByClassName("card");
let cards = [...card];
const cardDeck = document.querySelector(".deck");
// A list to add all matched cards
let matchedCards = document.getElementsByClassName("match");
// A list of size 2 for the opened cards
var openedCards =[];
//variables to be used for score panel
let moves=0;
let counter = document.querySelector(".moves");
const ratingStars = document.querySelectorAll(".fa-star");
var second = 0; minute = 0, hour=0;
var timer = document.querySelector(".timer");
var interval;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Starting the game
function startGame(){
  cards =shuffle(cards);
  for(var i=0;i<cards.length; i++){
    cardDeck.innerHTML ="";
    [].forEach.call(cards, function(item){
      cardDeck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match","disabled");
  }
  // reset moves
  moves =0;
  counter.innerHTML = moves;
  // reset star rating
  for(var i=0; i<ratingStars.length;i++){
    console.log(ratingStars.length);
    ratingStars[i].style.color ="#FFD700";
    ratingStars[i].style.visibility ="visibile";
  }
  // resetTimer
  hour, minute , second = 0;
  timer.innerHTML = "0";
  clearInterval(interval);
}

window.onload = startGame();

// setting event listeners when a card is clicked
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCardSymbol);
    card.addEventListener("click", addOpenedCard);
    card.addEventListener("click",congrats);
};

// displaycard function
function displayCardSymbol  () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}

// cards flipping
function addOpenedCard(){
  openedCards.push(this);
  if(openedCards.length ==2){
    updateMoves();
    if(openedCards[0].className=== openedCards[1].className){
      match();
    } else {
      unmatch();
    }
  }
}

// match case
function match(){
  openedCards[0].classList.add("match","disabled");
  openedCards[1].classList.add("match","disabled");
  openedCards[0].classList.remove("show","open","no-event");
  openedCards[1].classList.remove("show","open","no-event");
  openedCards = [];
}

// unmatch case
function unmatch(){
  openedCards[0].classList.add("unmatch");
  openedCards[1].classList.add("unmatch");
  disableCards();
  setTimeout(function(){
    openedCards[0].classList.remove("show","open","unmatch","no-event");
    openedCards[1].classList.remove("show","open","unmatch","no-event");
    enableCards();
    openedCards = [];
  },1000);
}

// disaplying Cards
function disableCards(){
  Array.prototype.filter.call(cards,function (card) {
    card.classList.add('disabled');
  });
}

// enabling cards
function enableCards(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i=0; i<matchedCards.length; i++){
      matchedCards[i].classList.add("disabled");
    }
  });
}

// Moves counter
function updateMoves(){
  moves++;
  counter.innerHTML =  moves;
  // Timer start
  if(moves==1){
    initiateTimer();
  }
  // Star Rating
  if(moves > 8  && moves <16){
    for(i=0;i<5;i++){
      if(i>3){
        ratingStars[i].style.visibility = "collapse";
      }
    }
  }
  else if(moves > 16  && moves <24) {
    for(var i=0;i<5;i++){
      if(i>2){
        ratingStars[i].style.visibility = "collapse";
      }
    }
  }
  else if(moves > 24 && moves <32 ) {
    for(var i=0;i<5;i++){
      if(i>1){
        ratingStars[i].style.visibility = "collapse";
      }
    }
  }
  else if(moves > 32) {
    for(var i=0;i<5;i++){
      if(i>=1){
        ratingStars[i].style.visibility = "collapse";
      }
    }
  }
}

// the timer
function initiateTimer(){
  interval = setInterval(function(){
    timer.innerHTML = hour+" : "+minute +" : "+second+"";
    second++;
    if(second==60){
      minute++;
      second =0;
    }
    if(minute ==60){
      hour++;
      minute =0;
    }
  },1000);
}

// winning model
let modal = document.getElementById("winPopup");
let starList = document.querySelectorAll(".stars li");
let exitIcon = document.querySelector(".exit");
function congrats(){
  if(matchedCards.length ==16){
    clearInterval(interval);
    var finalTime = timer.innerHTML;
    modal.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML=moves;
    document.getElementById("starRating").innerHTML=starRating;
    document.getElementById("totalTime").innerHTML=finalTime;
    exitModal();
  };
}

function exitModal(){
  exitIcon.addEventListener("click",function(e){
    modal.classList.remove("show");
    startGame();
  });
}

function playAgain(){
  modal.classList.remove("show");
  startGame();
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
