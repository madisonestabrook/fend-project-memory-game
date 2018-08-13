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
    for(let index = 1; index < 2; index++) { 
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
let interval; 

let moves = 0; 
let allCards; 
let openCards = []; 
let matched = 0;
let cardHTML = []; 

let modal = document.querySelector('section'); 
let closeIcon = document.querySelector('.closeIcon'); 

// Shuffle function

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

// Displays cards 


function startMemoryGame() { 

    let cardHTML = shuffle(cardClassesList).map(function(cardClassesList) { 
        resetMoves(); 
        return generateCards(cardClassesList); 
    }); 
    //cardChecker(); 
    moveHandler();
    addMove(); 
    startTimer();   
}

deck.innerHTML = cardHTML.join(''); 
allCards = document.querySelectorAll('card'); 
allCards.forEach(moveHandler); 

for(stars of starList) { 
    { 
        stars.style.color = 'yellow'; 
        stars.style.display = 'visible'; 
    }
}

let clock = document.querySelector('.clock'); 
clock.innerHTML = "0 mins and 0 secs"; 
clearInterval(interval);

 
document.onload = startMemoryGame(); 

//function cardChecker() { 
    //if(!card.classList.contains('open') || !card.classList.contains('show') && openCards.length < 2) { 
        //return true; 
    //}
    //else { 
        //return false; 
    //}
//}

function moveHandler() {
    allCards.forEach(function(card) {
        card = event.target; 
        //let openCards =+ event.target; 
        if(!card.classList.contains('open') || !card.classList.contains('show') && openCards.length < 2){ 
            console.log("Add an open card"); 
            openCards.push(card); 
            console.log("Open card length: ", openCards.length); 
            card.classList.add('open', 'show'); 

            if(openCards.length == 2) { 
                addMove(); 

                if(openCards[0].dataSet == openCards[1].dataSet.card) { 
                    console.log("This is a match!"); 
                    openCards[0].classList.add('match'); 
                    openCards[1].classList.add('match'); 

                    openCards = []; 

                    matched++; 

                    if(matched === 8) { 
                        userWins(); 
                    } 
                }
                else { 
                    setTimeout(function () { 
                        openCards.forEach(function(card) { 
                                card.classList.remove('open', 'show'); 
                        }); 
                    openCards = []; 
                    }, 314); 
                }
            }
                     } 
                    });
                     };

allCards.forEach(moveHandler); 

function addMove() { 
    moves++; 
    let movesText= document.querySelector('.moves'); 
    
    movesText.innerHTML = moves; 
    if(moves === 1) { 
        seconds = 0; 
        minutes = 0; 
        hours = 0; 
        startTimer();
    }
}

function resetMoves() { 
    let moves = 0; 
    document.querySelector('.moves').innerHTML= moves; 
}

function checkScore() { 
    if(moves === 19 || moves === 22) { 
        removeStar();
    }
}

function removeStar() { 
    for( var star of starList) { 
        if(stars.style.display !== 'none') { 
            stars.style.display = 'none'; 
        }
    }
}

function reload() { 
    modal.classList.remove('show');
    location.reload(); 
}


function startTimer() { 
    interval = setInterval(function() { 
        clock.innerHTML = minutes + " minutes " + seconds + " seconds"; 
        seconds++;
        if(seconds === 60) { 
            minutes++;
            seconds = 0;
        }
        if(minutes === 60) { 
            hours++; 
            minutes = 0; 
        }
    }, 1000);
}



function closeModal() { 
    //closeIcon.addEventListener('click', function (event) {
        modal.classList.add('hide'); 
        startMemoryGame();
    //}); 
}

function playAgain(){ 
    modal.classList.add('hide'); 
    console.log("Thanks for playing! Can you beat another round?"); 
    startMemoryGame();
}

function userWins() { 
    console.log("You just won!"); 
        clearInterval(interval); 
        finalTime = clock.innerHTML; 

        modal.classList.add('show'); 
        let starRating = document.querySelector('.stars').innerHTML; 

        document.getElementById('modal_moves').innerHTML = moves; 
        document.getElementById('modal_stars').innerHTML = starRating; 
        document.getElementById('modal_time').innerHTML = finalTime; 

        closeModal(); 
}

function finalFinalFunction(){ 
document.querySelector('.restart').addEventListener('click', playAgain());
document.querySelector('.modal_cancel').addEventListener('click', closeModal());
document.querySelector('.modal_replay').addEventListener('click', playAgain());
document.querySelector('.fa-repeat').addEventListener('click', playAgain());
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