/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// Global Variables 

let cardClassesList = [
    'fa-diamond',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-anchor',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-bomb',
    'fa-bomb',
    'fa-bicycle',
    'fa-bicycle',
    'fa-leaf',
    'fa-leaf'
];
  
const deck = document.querySelector('.deck'); 
let toggledCards = []; 
let moves = 0; 
let clockOff = true; 
let time = 0; 
let clockId;
let matched = 0


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

deck.addEventListener('click', event  => { 
    const clickTarget = event.target; 
    if (clickTarget.classList.contains("card")) { 
        clickTarget.classList.toggle('open'); 
        clickTarget.classList.toggle('show'); 
    }
    if(toggledCards.length >= 2) {
        checkForMatch(clickTarget); 
        addMove();
        checkScore();
        startClock();
    }
});
 

function shuffleDeck() { 
    const cardToShuffle = Array.from(document.querySelectorAll('.deck li')); 
    const shuffleCards = shuffle(cardToShuffle); 
}


function addMove() { 
    moves++;
    const movesText = document.querySelector('.moves'); 
    movesText.innerHTML = moves; 
}

function hideStar() { 
    const starList = document.querySelectorAll('.star');
    for (star of starList) { 
        if(star.style.display !== 'none') { 
            star.style.display = 'none'; 
            break;
        } 
    } 
}

function checkScore() { 
    if(moves === 19 || moves === 22) { 
        removeStar(); 
    }
}

function startClock() {
    time++;  
    let clockId = setInterval({ }, 10); 
}

function displayTime(){ 
    const clock = document.querySelector('.clock'); 
    const minutes = Math.floor(clockId / 60); 
    const seconds = clockId % 60; 
    if (seconds < 10) { 
        clock.innerHTML = `${minutes}:0${seconds}`; 
    } 
    else { 
        clock.innerHTML = `${minutes}:${seconds}`; 
    } 
}

function stopClock() {
    clearInterval(clockId); 
}

function toggleModal() { 
    const modal = document.querySelector('.modal_background'); 
    modal.classList.toggle('hide'); 
}

function writeModalStats() { 
    const timeStat = document.querySelector('.modal_time'); 
    const clockTime = document.querySelector('.clock'); 
    const movesStat = document.querySelector('.modal_moves'); 
    const starsStat = document.querySelector('.modal_stars'); 
    const stars = getStars(); 
    timeStat.innerHTML = ` Time = ${clockTime}`; 
    movesStat.innerHTML = ` Moves = ${moves}`; 
    starsStat.innerHTML = ` Stars = ${stars}`;
}

function getStars() { 
    stars = document.querySelectorAll('.star'); 
    starCount = 0; 
    for (star of starList) {
        if(star.style.display !== 'none') { 
            starCount++; 
        }
    }
    return starCount; 
}


function resetGame(){ 
    resetClockAndTime(); 
    resetMoves();
    resetStars();
    shuffleDeck(); 
}

function resetClockAndTime() { 
    stopClock(); 
    clockOff = true; 
    time = 0; 
    displayTime()
}

function resetMoves() { 
    moves = 0; 
    document.querySelector('.moves').innerHTML = moves; 
}

function resetStars() { 
    stars = 0; 
    const starList = document.querySelectorAll('.star'); 
    for(star of starList) { 
        star.style.display = 'inline';
    }
}

function checkForMatch() { 
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) { 
        toggledCards[0].classList.toggle('match'); 
        toggledCards[1].classList.toggle('match'); 
        toggledCards = []; 
        matched++; 
    }
    const TOTAL_PAIRS = 8; 
    if(matched === TOTAL_PAIRS) { 
        gameOver(); 
    }
}

function gameOver() { 
    stopClock(); 
    writeModalStats(); 
    toggleModal(); 
}


function replayGame() { 
    resetGame(); 
    toggleModal(); 
}

function resetCards(){ 
    const cards =  document.querySelectorAll('.deck li'); 
    for(let card of cards) 
        card.className = 'card';
}

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal_cancel').addEventListener('click', toggleModal);
document.querySelector('.modal_replay').addEventListener('click', replayGame);
document.querySelector('.fa-repeat').addEventListener('click', resetGame);

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
