// Card list 
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

let deck = document.querySelector('.deck');
let card2 = document.querySelector(".deck");
let card = document.querySelector(".deck"); 


// From Ryan 
function makeCard(card_class) {
    let li = document.createElement('li');
    li.classList.add('card');
    li.classList.add('card-' + card_class);
    li.setAttribute('data-card', card_class);
    let i = document.createElement('i');
    i.classList.add('card-icon', 'fa', card_class);
    i.setAttribute('data-card', card_class);
    li.appendChild(i);
    return li;
}


function generateCards(card) {
    let cardClasses = shuffle(cardClassesList);
    for (let index = 1; index < 2; index++) {
        let card_class = cardClasses[index];
        let newElement = makeCard(card_class);
        deck.appendChild(newElement);
    }
}




// Global variables 

let starList = document.querySelectorAll('.stars li');
let stars = document.querySelectorAll('.fa fa-star');

let seconds = 0;
let minutes = 0;
let hours = 0;
let openCards = [];
let openCardClassList = []; 
let interval;

let moves = 0;
let matched = 0;
let cardHTML = [];

let modal = document.getElementById('myDiv');
let closeIcon = document.querySelector('.closeIcon');

let clock = document.querySelector('.clock');

// Shuffle function

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

// Displays cards 

function resetMoves() {
    let moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function addMove() {
    moves = moves + 1;
    let movesText = document.querySelector('.moves');

    movesText.innerHTML = moves;
    if (moves === 1) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        startTimer();
    }
}

function cardChecker() {
    deck.addEventListener("click", function(event) {
        card = event.target;
        if (card.classList.contains('open') || card.classList.contains('show') && openCards.length < 2) {
            return true;
        } else {
            return false;
        }
    });
}



function startTimer() {
    interval = setInterval(function() {
        clock.innerHTML = minutes + " minutes " + seconds + " seconds";
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
    }

deck.innerHTML = cardHTML.join('');

const cards = document.getElementsByClassName('.card'); 
const allCards = [... cards]; 
allCards.forEach(function(cards) {
    allCards.addEventListener("click", function(event){
        allCards.push(event.target); 
    });
});

for (stars of starList) {
    {
        stars.style.color = 'yellow';
        stars.style.display = 'visible';
    }
}


clock.innerHTML = "0 mins and 0 secs";
clearInterval(interval);


document.onload = startMemoryGame();

function selectFirstCard() { 
    card.addEventListener("click", function(event) { 
        card = event.target;
        card.classList.add('open', 'show');
        openCards.push(card); 
        return card; 
    }); 
    card.removeEventListener("click", function(event) { 
        card = event.target;
        card.classList.add('open', 'show');
        openCards.push(card); 
        return card; 
    });  
}
function selectSecondCard() {
    card2.addEventListener("click", function(event) { 
        card2 = event.target;
        card2.classList.add('open','show');
        openCards.push(card2);
        return card2; 
    });
    card2.removeEventListener("click", function(event) { 
        card2 = event.target;
        card2.classList.add('open','show');
        openCards.push(card2);
        return card2; 
    });  
}

function selectCards() {
    selectFirstCard(); 
    selectSecondCard(); 
    addMove();
    
    if(card.classList.contains(card2.classList)){
    setInterval(function(){
            card.classList.remove('open', 'show');
            card2.classList.remove('open', 'show'); 
     }, 1111);
    }
    else{
        console.log("This is a match!");
        matched = matched + 1;
        } 
        if (matched === 16) {
            userWins(); 
    }

}

function startMemoryGame() {

    let cardHTML = shuffle(cardClassesList).map(function(cardClassesList) {
        resetMoves();
        return generateCards(cardClassesList);
    });
    console.log("The game has started!");
    startTimer();
    selectCards(); 
    cardChecker();
    checkScore();
    addMove();
}

    //allCards.forEach(moveHandler);

    function checkScore() {
        if (moves > matched) {
            removeStar();
        }
        if(matched === moves) { 
            stars = 3; 
        }
        if(matched > moves){ 
            console.log("How is the number of matched card greater than the number of moves?")
        }
    }

    function removeStar() {
        for (var star of starList) {
            if (stars.style.display !== 'none') {
                stars.style.display = 'none';
            }
        }
    }

    function reload() {
        modal.classList.remove('show');
        location.reload();
    }

    function closeModal() {
        modal.classList.add('hide');
    }

    function playAgain() {
        modal.classList.add('hide');
        console.log("Thanks for playing! Can you beat another round?");
        startMemoryGame();
    }

document.querySelector('.restart').addEventListener("click", playAgain);
document.querySelector('.modal_cancel').addEventListener("click", closeModal);
document.querySelector('.modal_replay').addEventListener("click", playAgain);
document.querySelector('.fa-repeat').addEventListener("click", playAgain);

    function userWins() {
        console.log("You just won!");
        clearInterval(interval);
        finalTime = clock.innerHTML;

        modal.classList.remove('hide');
        modal.classList.add('show');
        let starRating = document.querySelectorAll('.stars');

        //document.getElementsByClassName('modal_moves').insertAdjacentHTML('beforebegin', moves);
        //document.getElementsByClassName('modal_moves').assign(moves);
        //Object.assign(moves, document.getElementsByClassName('modal_moves'));
        //Object.assign(starRating, document.getElementsByClassName('modal_stars')); 
        document.getElementsByClassName('modal_moves').setAttribute('moves = ', moves);
        document.getElementsByClassName('modal_stars').textContent = starRating;
        document.getElementsByClassName('modal_time').textContent = finalTime;

        //closeModal();
    }

    //document.querySelector('.restart').addEventListener('click', playAgain());
    //document.querySelector('.modal_cancel').addEventListener('click', closeModal());
    //document.querySelector('.modal_replay').addEventListener('click', playAgain());
    //document.querySelector('.fa-repeat').addEventListener('click', playAgain());

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