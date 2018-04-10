/*
 * Create a list that holds all of your cards
 */
let cardNames = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bicycle', 'fa-bolt',
 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-cube', 'fa-cube', 'fa-diamond', 'fa-diamond',
 'fa-leaf', 'fa-leaf', 'fa-paper-plane-o', 'fa-paper-plane-o'];

// getting elements from index.html and assigning them to variables
const deck = document.getElementsByClassName('deck')[0];
const cards = document.getElementsByClassName('card');
const movesCounter = document.getElementsByClassName('moves')[0];
const winModal = document.getElementsByClassName('winModal')[0];
const restart = document.getElementsByClassName('restart')[0];

let storedCard; // first card from pair is stored here
let clickAllowed; // card face may be revealed
let matches; // matches counter
let time; // timer
let timeTxt; // variable stores time of play as text
let starRating; //number of star points

startGame();

// adding functionality to restart button
restart.addEventListener('click', function() {
	startGame();
});

// starting new game
function startGame() {
	winModal.style.display = 'none';
	clearDeck();
	storedCard = null;
	clickAllowed = true;
	matches = 0;
	clearInterval(time);
	time = 0;
	starRating = 3;
	// disable modal window for winning game
	winModal.style.display = 'none';
	// shuffle cards
	cardNames = shuffle(cardNames);
	// add cards to html
	addCardsToPage(cardNames);
	// set moves Cunter to 0
	movesCounter.innerText = "0";
	// start timer
	startTimer();
}

// clear deck (remove cards)
function clearDeck() {
	while (deck.firstChild) {
    	deck.removeChild(deck.firstChild);
	}
}

// create html for the cards and add them to the page
function addCardsToPage(array) {
	for (var i = 0; i < array.length; i++) {
		const li = document.createElement('li');
		li.classList.add('card');

		const card = document.createElement('i');
		card.classList.add('fa', array[i]);
		
		li.appendChild(card);
		li.addEventListener('click', cardClicked);
		deck.appendChild(li);
	}
}

// what to do after clicking the card
function cardClicked() {
	//card is clickable
	if (this.classList.length === 1 && clickAllowed) {
		//if this is first revealed card
		if (storedCard == null) {
			this.classList.add('open', 'show');
			storedCard = this;
		  // if this is second revealed card	
		} else {
			this.classList.add('open', 'show');
			clickAllowed = false;
			//chceck if cards are matched.
			if (this.firstChild.classList[1] == storedCard.firstChild.classList[1]) {
				cardsMatched(this, storedCard);
			} else {
				cardsNotMatched(this, storedCard);
				setTimeout(faceDownCards, 500, this, storedCard);		
			}
		}
	}	
}

// toggle cards face down when they dont match
function faceDownCards(firstCard, secondCard) {
	firstCard.classList.remove('open', 'show', 'not_match');
	secondCard.classList.remove('open', 'show', 'not_match');
	nextMove();
}

// what to do when the cards are matched
function cardsMatched(firstCard, secondCard) {
	firstCard.classList.add('match');
	secondCard.classList.add('match');
	matches++;
	nextMove();
}

// what to do when the cards are notmatched
function cardsNotMatched(firstCard, secondCard) {
	firstCard.classList.add('not_match');
	secondCard.classList.add('not_match');
}

// what to do before next move
function nextMove() {
	checkGameWin();
	storedCard = null;
	clickAllowed = true;
	movesCounter.innerText++;
	checkStars();
}

// timer for the game
function startTimer() {
	let sec = 0;
	let min = 0;
	const timer = document.getElementsByClassName('time')[0];
	timer.innerText = min + "m " + sec + "s";
	time = setInterval(function() {
		timeTxt = min + "m " + sec + "s";
		timer.innerText = timeTxt;
		sec++;
		if (sec == 60) {
			min++;
			sec = 0;
		}
	}, 1000);

}

// checks if star rating have to be changed and change it
function checkStars() {
	if (movesCounter.innerText == "16" || movesCounter.innerText == "32" ||
			movesCounter.innerText == "48") {
		const stars = document.getElementsByClassName('fa-star');
		stars[stars.length - 1].classList.add('fa-star-o');
		stars[stars.length - 1].classList.remove('fa-star');
		starRating--;
	}
}

// after winning the game
function checkGameWin() {
	if (matches === cardNames.length/2) {
		winModal.style.display = 'block';
		clearInterval(time);

		const yourStars = document.getElementsByClassName('yourStars')[0];
		yourStars.innerText = starRating;

		const yourTime = document.getElementsByClassName('yourTime')[0];
		yourTime.innerText = timeTxt;

		const modalRestart = document.getElementsByClassName('modalRestart')[0];
		modalRestart.addEventListener('click', function() {
			startGame();
		});

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
