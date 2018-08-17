// Coding by Madison Estabrook in vanilla JavaScript ES6

// Global Variables
let card = document.getElementsByClassName('card');
let cards = [... card]; 
let moves = 0; 
let oneCount = 0; 
let deck = document.querySelector(".deck");
const moveCounterCONST = document.querySelector('.moves'); 
const star = document.getElementsByClassName(".fa-star"); 
let stars = [... star]; 
let i, gameTime, results; 
const matchedCard = document.getElementsByClassName("match"); 
const modal = document.getElementById("myDiv"); 
const min = document.querySelector('.min'); 
const sec = document.querySelector('.sec'); 
let openedCards = []; 
const restart = document.querySelector(".modal_cancel"); 
const playAgainButton = document.querySelector(".modal_replay"); 

// Shuffle Function (NOT MINE)
function shuffle(array) {
    let currentIndex = array.length,
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

// startGame() Function 
function startGame() { 
    stopModal(); 
    openedCards = []; 
    oneCount = 0; 
    cards = shuffle(cards); 
    deck.innerHTML = ""; // Clears the current deck 
    cards.forEach(function(card) {
        card.classList.remove("show", "open", "match"); 
        deck.appendChild(card); 
        }); // For each card, remove the classes "show", "open", and "match"; also, add each card to the deck  
    moves = 0; 
    stars.length = 3; 
    stars.forEach(function(star) {
        star.className = ' '; 
        star.classList.add('fas', 'fa-star'); 
    }); // For each card, reset the className and add the class names "fas" as well as "fa-star"
    seconds = 0; 
    minutes = 0; 
    min.innerHTML = '00'; 
    sec.innerHTML = '00';
    cardClicks(); 
    clearInterval(gameTime); 
}

// stopModal() Function
function stopModal() { 
    clearTimeout(results); 
}

// cardClicks() function 
function cardClicks(){ 
    cards.forEach(function(card) { // For all the cards, 
        card.addEventListener('click', flipCard); 
        card.addEventListener('click', matchedEval); 
        card.addEventListener('click', gameOver); 
        card.addEventListener('click', clickToStart, { 
            once: true
        }); // Add event listeners that call various functions when a card is clicked
    });
}

// flipCard() Function 
function flipCard(){ 
    this.classList.toggle('open'); 
    this.classList.toggle('show'); 
} // For each of the card classes above, toggle (see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList for more info)

// Thank you @drunkenismet for this OOP snippet and again for helping me
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

// matchedEval() Function 
function matchedEval() { 
    openedCards.push(this); // Add the current card to the list of opened card
    if(openedCards.length === 2) { // If there are 2 opened cards, 
        moveCounter();  // Call the moveCounter() function
    if(openedCards[0].innerHTML === (openedCards[1].innerHTML)){ /* 
        If the first element (index 0) of openedCard's firstElementChild's class matches the same for the second element (index 1) of opened cards */
        weGotAMatch(); // Call the weGotAMatch function 
    }
    else if(openedCards[0].firstElementChild.getAttribute("class") !== openedCards[1].firstElementChild.getAttribute("class")) { 
        // If the opened card's classes do NOT match, 
        weDoNotHaveAMatch();  // Call the weDoNotHaveAMatch function
    }
    }
}



//weGotAMatch() Function  
function weGotAMatch() { 
    console.log("Your cards match!"); // Prints the message in quotes to the console 
    openedCards[0].classListChain.add("match").classListChain.remove("show", "open"); // Adds the class match plus removes the classes show and open from the first card
    openedCards[1].classListChain.add("match").classListChain.remove("show", "open");  // Adds the class match plus removes the classes show and open from the second card
    openedCards = []; // Resets the openedCards variable
}

// weDoNotHaveAMatch() Function
function weDoNotHaveAMatch() { 
    setTimeout(function() { // In the number of ms declared on line 136, 
            openedCards[0].classListChain.remove("show", "open", "matched"); // Removes the 3 listed classes from the first card
            openedCards[1].classListChain.remove("show", "open", "matched"); // Removes the 3 listed classes from the second card
            openedCards = []; 
    }, 678); 
}

// moveCounter() Function
function moveCounter() { 
    moves++; 
    (moves !== 1) ? (moveCounterCONST.innerHTML = `${moves}`) : ((moveCounterCONST.innerHTML = `${moves}`), (seconds = 0, minutes = 0));
     // Ternary statement (condition) : (if-true-then): (if-false-then) 
    if(moves > 9 && moves <= 12) { // If moves is greater than 9 and less than or equal to 12, 
        removeSomeStars(); // Call the removeSomeStars() function
    }
    if(moves > 12 && moves < 15) { // If moves is greater than 12 and less than 15, 
        removeAllStars(); // Call the removeAllStats() function
    }
    return moves; // Return moves
}

// startTimer() Function 
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
            } // The function above displays the time in an easy-to-read format
    }, 10000);
}

// clickToStart() Function
function clickToStart() { 
    oneCount++;  
    for(i = 0; i < oneCount; i++) { 
        startTimer(); 
    }
}

// removeSomeStars() Function
function removeSomeStars() { 
    stars[i].classList.remove("fa-star").classList.add("fa-star-half");
    // Adds and removes classes from stars
}

// removeAllStars() Function 
function removeAllStars() { 
    stars[i].classList.remove('fas',"fa-star-half").classList.add("far", "fa-star"); 
    // Adds and removes classes from stars 
}

// gameOver() Function 
function gameOver() {
    if(matchedCard.length === 16 || moves >= 10) {  // If there are 16 matches or 10 moves, 
        clearInterval(gameTime); // Clear the internal of gameTime
        let finalTime = `${min.innerHTML}:${sec.innerHTML}`; // Grabs the final time
        results = setTimeout(function() {
            modal.style.display = 'block';
        }, 3000); 

    let starScore = document.querySelector('.fa-star').innerHTML; 
    let totalMoves = document.querySelector('.modal_moves').innerHTML = 'Moves: ' + moves ; 
    document.querySelector(".modal_stars").innerHTML = starScore; 
    document.querySelector('.modal_time').innerHTML = finalTime; 
    }
}

playAgainButton.addEventListener("click", reset); 

// reset() Function
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