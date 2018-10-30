/*
 * Create a list that holds all of your cards
 */
 let cards = ['fa fa-diamond',
              'fa fa-paper-plane-o',
              'fa fa-anchor',
              'fa fa-bolt',
              'fa fa-cube',
              'fa fa-leaf',
              'fa fa-bicycle',
              'fa fa-bomb'];

cards = [...cards, ...cards];

let flipped = [];
let matchCards = [];
let moves = 0;
let timeStarter = 0;
let minutes = 0;
let seconds = 0;
let stars = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// New Game: Shuffle and creates all elements.
function newGame(){
    cards = shuffle(cards);
    let i = 0;
    $('.card').each(function(){
        $(this).append('<i class="' + cards[i] + '"></i>');
        i++;
    })
}

// Restart the game
function restartGame(){
    hideCards();
    resetMove();
    resetStars();
    resetTimer();
    newGame();
}

newGame();

$('.restartBtn').click(function(){
    restartGame();
})

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

// Game functions
// Display the card's symbol when clicked
// Check if they match
$('.card').click(function(){
    $(this).addClass('open show disable');
    timeStarter++;
    if (timeStarter === 1){
        startTimer();
    };
    flipped.push($(this).children().attr('class'));

    if (flipped.length === 2) {
        moveCount();
        if (flipped[0] === flipped[1]) {
            match();

        if (matchCards.length === 8){
            endGame();
        }

        } else {
            notMatch();
        }
    }
})

// Reset de cards
function hideCards(){
    $('.card').removeClass('open show match disable');
    $('.card').children('i').remove();
    matchCards = [];
    flipped = [];
}

// ** NOMATCH/MATCH FUNCTIONS ** //

// Not Match function: remove cards and hide the card's symbol.
function notMatch(){
    $('.card').addClass('disable');
    setTimeout(function(){
        $('.card.open.show').removeClass('open show disable');
        $('.card').removeClass('disable');
        flipped = [];
    },  1000);
}

// Match function: lock the cards in the open position.
function match(){
    $('.card.open.show').removeClass('open');
    $('.card.show').addClass('match disable');
    matchCards.push(flipped[0]);
    flipped = [];
}

// ** MOVE FUNCTIONS ** //

// Count Moves
function moveCount(){
        moves++;
        $('.moves').html(moves);
        countStars();
}

// Reset Moves
function resetMove(){
    moves = 0;
    $('.moves').html(moves);
}

// ** TIMER FUNCTIONS ** //

// Start time
function startTimer(){
    time = setInterval(function() {
        seconds++;
        if (seconds === 60){
            seconds = 0;
            minutes++;
        }
        $('.minutes').html(minutes);
        $('.seconds').html(seconds);
    }, 1000);
}

// Reset Timer
function resetTimer(){
    timeStarter = 0;
    minutes = 0;
    seconds = 0;
    $('.minutes').html(minutes);
    $('.seconds').html(seconds);
    clearInterval(time);
}

// ** SCORE FUNCTIONS ** //

function countStars(){
    stars = 3;
    if (moves > 15 && moves <= 20){
        $('.star1').children().addClass("fa fa-star-o");
        stars = 2;
    } else if(moves >= 21){
        $('.star2').children().addClass("fa fa-star-o");
        stars = 1;
    }
}

function resetStars(){
    $('.star1').children().addClass("fa-star").removeClass("fa-star-o");
    $('.star2').children().addClass("fa-star").removeClass("fa-star-o");
}

// ** WINNER MODAL FUNCTION ** //

function endGame(){
    clearInterval(time);
    setTimeout(function popUp() {
        $('.modal-popup').show();
    }, 1000);
    $('.final-moves').html(moves);
    $('.timer-min').html(minutes);
    $('.timer-sec').html(seconds);
    $('.final-stars').html(stars);
}

$('.close').click(function() {
    $('.modal-popup').hide();
    restartGame();
})

$('.replay').click(function() {
    $('.modal-popup').hide();
    restartGame();
})
