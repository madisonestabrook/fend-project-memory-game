// Coding by Madison Estabrook in vanilla JavaScript ES6

// Global Variables
let card = document.getElementsByClassName('card');
let cards = [... card]; 
let moves = 0; 
let oneCount = 0; 
let deck = document.querySelector(".deck");
const moveCounterCONST = document.querySelector('.moves'); 
const star = document.querySelectorAll(".stars"); 
let stars = [... star]; 
let i, gameTime, results; 
const matchedCard = document.getElementsByClassName("match"); 
const modal = document.getElementById("myDiv"); 
const min = document.querySelector('.min'); 
const sec = document.querySelector('.sec'); 
let openedCards = []; 
const restart = document.querySelector(".modal_cancel"); 
const playAgainButton = document.querySelector(".modal_replay"); 

// Shuffle Function 
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

restart.addEventListener('click', startGame()); 

function startGame() { 
    stopModal(); 
    openedCards = []; 
    oneCount = 0; 
    cards = shuffle(cards); 
    deck.innerHTML = "";
    cards.forEach(function(card) {
        card.classList.remove("show", "open", "match"); 
        deck.appendChild(card); 
        }); 
    moves = 0; 
    stars.length = 3; 
    stars.forEach(function(star) {
        star.className = ' '; 
        star.classList.add('fas', 'fa-star'); 
    });
    seconds = 0; 
    minutes = 0; 
    min.innerHTML = '00'; 
    sec.innerHTML = '00';
    cardClicks(); 
    clearInterval(gameTime); 
}

function stopModal() { 
    clearTimeout(results); 
}

function cardClicks(){ 
    cards.forEach(function(card) {
        card.addEventListener('click', flipCard); 
        card.addEventListener('click', matchedEval); 
        card.addEventListener('click', gameOver); 
        card.addEventListener('click', clickToStart, { 
            once: true
        }); 
    });
}

function flipCard(){ 
    this.classList.toggle('open'); 
    this.classList.toggle('show'); 
}

function matchedEval() { 
    openedCards.push(this); 
    if(openedCards.length === 2) { 
        moveCounter(); 
    if(openedCards[0].firstElementChild.getAttribute("class") === openedCards[1].firstElementChild.getAttribute("class")){ 
        weGotAMatch(); 
    }
    else if(openedCards[0].firstElementChild.getAttribute("class") !== openedCards[1].firstElementChild.getAttribute("class")) { 
        weDoNotHaveAMatch(); 
    }
    }
}

Object.defineProperty(HTMLElement.prototype, "classListChain", {
    get: function () {
      let self = this;
      return {
        add: function (cls) {
          self.classList.add(cls);
          return self;
        },
        remove: function (cls) {
          self.classList.remove(cls);
          return self;
        }
      };
    }
  });

function weGotAMatch() { 
    console.log("Your cards match!"); 
    openedCards[0].classListChain.add("match").classListChain.remove("show", "open"); 
    openedCards[1].classListChain.add("match").classListChain.remove("show", "open"); 
    openedCards = []; 
}

function weDoNotHaveAMatch() { 
    setTimeout(function() {
            openedCards[0].classListChain.remove("show", "open", "matched"); 
            openedCards[1].classListChain.remove("show", "open", "matched");
            openedCards = []; 
    }, 678); 
}

function moveCounter() { 
    moves++; 
    (moves !== 1) ? (moveCounterCONST.innerHTML = `${moves} moves`) : ((moveCounterCONST.innerHTML = `${moves} move`), (seconds = 0, minutes = 0)); 
    if(moves > 9 && moves <= 12) { 
        removeSomeStars(); 
    }
    if(moves > 12 && moves < 15) { 
        removeAllStars(); 
    }
    return moves; 
}

function startTimer() { 
    gameTime = setInterval(function() { 
            seconds++; 
            if(seconds < 10) { 
                sec.innerHTML = `0${seconds}`; 
            }
            if(seconds > 9) { 
                sec.innerHTML = `${seconds}`; 
            }
            if(seconds === 60) { 
                minutes++; 
                seconds = 0; 
                min.innerHTML = `0${minutes}`; 
                sec.innerHTML  = `0${seconds}`;
            }
            if(minutes > 9) { 
                min.innerHTML =  `${minutes}`; 
            }
    }, 1000);
}

function clickToStart() { 
    oneCount++; 
    for(i = 0; i < oneCount; i++) { 
        startTimer(); 
    }
}

function removeSomeStars() { 
    stars[i].classListChain.remove("fa-star").classListChain.add("fa-star-half");
}

function removeAllStars() { 
    stars[i].classListChain.remove('fas',"fa-star-half").classListChain.add("far", "fa-star")
}

function gameOver() {
    if(matchedCard.length === 16) { 
        clearInterval(gameTime); 
        let finalTime = `${min.innerHTML}:${secs.innerHTML}`; 
        results = setTimeout(function() {
            modal.style.display = 'block';
        }, 2000); 

    let starScore = document.querySelector('.stars').innerHTML; 
    let totalMoves = document.querySelector('.modal_moves'); 
    document.querySelector(".modal_stars") = starScore; 
    document.getElementById('modal_time').innerHTML = finalTime; 
    }
}

playAgainButton.addEventListener("click", reset); 

function reset(){ 
    modal.style.display = "none"; 
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