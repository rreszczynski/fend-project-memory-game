/*
 * Create a list that holds all of your cards
 */
var cardNames = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle', 'fa-bolt',
 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond',
 'fa-leaf', 'fa-leaf', 'fa-paper-plane-o', 'fa-paper-plane-o'];

const deck = document.getElementsByClassName('deck');
const cards = document.getElementsByClassName('card'); 


// shuffle cards
cardNames = shuffle(cardNames);
// add cards to html
addCardsToPage(cardNames);

// create html for the cards and add them to the page
function addCardsToPage(array) {
	for (var i = 0; i < array.length; i++) {
		const li = document.createElement('li');
		li.classList.add('card');

		const card = document.createElement('i');
		card.classList.add('fa', array[i]);
		
		li.appendChild(card);
		li.addEventListener('click', cardClicked);
		deck[0].appendChild(li);
	}
}

// what to do after clicking the card
function cardClicked() {
		console.log(this.classList.length);
		if (this.classList.length === 1) {
			this.classList.add('open', 'show');
			console.log('x');
		}
}

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
