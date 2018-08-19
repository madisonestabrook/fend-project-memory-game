// Coding by Madison Estabrook in vanilla JavaScript ES6 
// Global Variables
let card = document.getElementsByClassName('card');
let cards = [... card];
let openedCards = [];    
let oneCount, moves;  
let deck = document.querySelector(".deck");
const moveCounterCONST = document.querySelector('.moves'); 
let star = document.getElementsByClassName("fa-star"); 
let stars = [... star]; 
let i, gameTime, results, matchedCard; 
const modal = document.getElementById("myDiv"); 
const min = document.querySelector('.min'); 
const sec = document.querySelector('.sec'); 
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

document.addEventListener('click', startGame()); 

// startGame() Function 
function startGame() { 
    stopModal(); 
    //openedCards = []; 
    oneCount = 0;
    cards = shuffle(cards); 
    deck.innerHTML = ""; // Clears the current deck 
    cards.forEach(function(card) {
        card.classList.remove("show", "open", "match"); 
        deck.appendChild(card); 
        }); // For each card, remove the classes "show", "open", and "match"; also, add each card to the deck  
    moves = matchedCard = 0; 
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
    clearInterval(results); 
    modal.classList.add("hide"); 
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
    event.target.classList.toggle('open'); 
    event.target.classList.toggle('show');
    event.target.classList.toggle('disabled');
    //event.target.classList.remove('matched'); 
    //event.target.classList.toggle('hide'); 
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

  // Function mostly from the MDN (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Checking_whether_a_value_exists_in_an_array for more info)
 function checkerFunction(arr, val) { 
     return arr.some(function(arrVal) {
         return val == arrVal; 
     });  
 }


//weGotAMatch() Function  
function weGotAMatch() { 
    console.log("Your cards match!"); // Prints the message in quotes to the console 
    for(i = 0; i < openedCards.length -1; i++) { 
        openedCards[i].classListChain.add("match").classListChain.remove("show", "open"); 
    }
    enableCards(); 
    openedCards = []; // Resets the openedCards variable
}

// disableCards() Function inspired by @drunkenismet 
function disableCards() { 
    Array.prototype.filter.call(card, function(card) {
        card.classList.add("disable"); 
    });
}
// ableCards() Function inspired by @drunkenismet 
function enableCards() { 
    Array.prototype.filter.call(card, function() 
    {
        card.classList.remove("disabled");
         for(i = 0; i < matchedCard.length; i++) { 
             matchedCard[i].classList.add("disabled"); 
         } 
    }); 
}

// weDoNotHaveAMatch() Function
function weDoNotHaveAMatch() { 
    //if(openedCards.length >= 1) {
    setInterval(function() {
        disableCards(); // In the number of ms declared on line 136, 
        //for(i=0; i < openedCards.length; i++) { 
            //if(openedCards[i] = "li.card") {
            //openedCards[i] = document.querySelector(openedCards[i].toString()); 
            //this.classList.remove("show","open", "matched"); 
            //openedCards[i].classList.add("hide"); 
            //openedCards[i].children.className = "hide";
            //openedCards[i].removeEventListener("click", matchedEval()); 
            //openedCards[i].children.classList.add("hide");
            
        //}
   // }
    //openedCards.removeEventListener("click", matchedEval);             
    openedCards = []; 
    }, 678); 
}
//}
// moveCounter() Function
function moveCounter() { 
    moves++; 
    (moves !== 1) ? (moveCounterCONST.innerHTML = `${moves}`) : ((moveCounterCONST.innerHTML = `${moves}`), (seconds = 0, minutes = 0));
     // Ternary statement (condition) : (if-true-then): (if-false-then) 
    if(moves < 9 && moves <= 7) { // If moves is greater than 9 and less than or equal to 12, 
        removeSomeStars(); // Call the removeSomeStars() function 
    }
    if(moves > 7 && moves < 15) { // If moves is greater than 7 and less than 15, 
        removeAllStars(); // Call the removeAllStats() 
    }
    return moves; // Return moves
}

// matchedEval() Function 
function matchedEval() {
openedCards.push(this); // Add the current card to the list of opened card
    if(openedCards.length === 2) { // If there are 2 opened cards,
        moveCounter();  // Call the moveCounter() function
        //let test = Object.is(openedCards[1], openedCards[0]); // Declares a variable, test, that tests if openedCards[1] equals openedCards[0]
        let test = checkerFunction(openedCards,(this));
        //let test = myFunction(openedCards, this); 
        if(test || test === true || test == true){ 
            weDoNotHaveAMatch(); 
            flipCard(); 
           
        }
        else if (test != true){ 
          weGotAMatch(); 
          matchedCard++;   

        }
    }
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
    }, 100);
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
    for(i = 0; i < stars.length - 2; i++) {
    stars[i].classList.add("hide");
    // Removes classes from stars
} 
}

// removeAllStars() Function 
function removeAllStars() { 
    for(i= 0;i < stars.length; i++) {
    stars[i].classList.add('hide'); 
    // Adds and removes classes from stars 
}
}

// gameOver() Function 
function gameOver() {
    if(matchedCard.length === 16 || moves >= 8) {  // If there are 16 matches or 10 moves, 
        clearInterval(gameTime); // Clear the interval of gameTime
        let finalTime = `${min.innerHTML}:${sec.innerHTML}`; // Grabs the final time
        results = setInterval(function() {
            modal.style.display = 'block';
        }, 300); 

    let starScore = document.querySelector('.fa-star').innerHTML; 
    let totalMoves = document.querySelector('.modal_moves').innerHTML = 'Moves: ' + moves ; 
    document.querySelector(".modal_stars").innerHTML = starScore; 
    document.querySelector('.modal_time').innerHTML = finalTime;
    playAgainButton.addEventListener("click", reset);
    moves = 0;
    seconds = 0; 
    minutes = 0;  
    }
}



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
