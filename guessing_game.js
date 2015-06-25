//On "Set" form submit, call guess() and pass in the value of the form.
$("#set").on("click", guess);

//On Shutdown button click, call newGame();
$("#shutdown").on("click", newGame);

//On Get Hint button click, call getHint();
$("#hint").on("click", getHint);

//Start the game:
var keyNumber = numGen();
var guessCount = 5;

//Generates a random number 1-100
function numGen() {
	return Math.floor(Math.random()*100);
}

//Check user input from the game UI against newNumber variable. If match,
//reveal newNumber and end the game. If no match, store the guess in the 
//guessList array, and give two hints:
//1. Based on how close (within 5 = burning hot! 10 = hot 15 = warm 20 = cold 30+ = freezing)
//2. Based on whether num is higher or lower than keyNumber.
//Then decrease the number of guesses remaining.
function guess() {
	var num = parseInt($("#try").val());
	$(".message_box").empty();
	var diff = Math.abs(keyNumber - num); 
	console.log(keyNumber);
	console.log(num);
	console.log(diff);
	if (guessCount === 0) {
		return alert("The game is over. To start again, click the 'Shutdown' button");
	}

	if (typeof num !== 'number' || num > 100 || num < 0) {
		return alert("Please input a number from 1-100.");
	}

	if (num === keyNumber) {
		$(".message_box").append(document.createTextNode("You've successfully attuned the reactor to the element of fire!"));
		//Change the background color to firey red and all text to orange
		//Reveal Embedded video: https://www.youtube.com/watch?v=WLgDDtwVNw4
		}

	else if (diff >= 30) {
		$(".message_box").append(document.createTextNode("The reactor is freezing. The fire has reduced to a dying ember."));
		$(".tracker").append(document.createTextNode("Attempt #"+(6-guessCount)+": "+num+", Reactor Condition: Freezing."));
	} 
	else if (diff < 30 && diff >= 20) {
		$(".message_box").append(document.createTextNode("The reactor is cold. The fire is dim, but alive."));
		$(".tracker").append(document.createTextNode("Attempt #"+(6-guessCount)+": "+num+", Reactor Condition: Cold."));
	}
	else if (diff < 20 && diff >= 10) {
		$(".message_box").append(document.createTextNode("The reactor is warm. The fire is growing."));
		$(".tracker").append(document.createTextNode("Attempt #"+(6-guessCount)+": "+num+", Reactor Condition: Warm."));
	}
	else if (diff < 10 && diff >= 5) {
		$(".message_box").append(document.createTextNode("The reactor is hot. The fire burns brightly"));
		$(".tracker").append(document.createTextNode("Attempt #"+(6-guessCount)+": "+num+", Reactor Condition: Hot."));
	}
	else if (diff < 5) {
		$(".message_box").append(document.createTextNode("The reactor is burning hot! The fire rages intensely. You are close to attunement!"));
		$(".tracker").append(document.createTextNode("Attempt #"+(6-guessCount)+": "+num+", Reactor Condition: Burning Hot."));
	}

	if (num > keyNumber) {
		$(".message_box").append(document.createTextNode("Your observations suggest the attunment value is lower."));
	}
	else {
		$(".message_box").append(document.createTextNode("Your observations suggest the attunment value is higher."));
	}

	guessCount--;
	$(".message_box").append(document.createTextNode("Attempts remaining: "+guessCount))
	switch(guessCount) {
		case 5:
			$(".message_box").append("<p>The reactor is stable.</p>")
			break;
		case 4:
			$(".message_box").append("<p>The reactor shudders, but remains stable.</p>")
			break;
		case 3:
			$(".message_box").append("<p>The reactor creaks loudly. It is barely stable.</p>")
			break;
		case 2:
			$(".message_box").append("<p>The reactor emits a loud groan. It is unstable.</p>")
			break;
		case 1:
			$(".message_box").append("<p>The reactor shakes violently. It is highly unstable!</p>")
			break;
		case 0:
			$(".message_box").append("<p>THE REACTOR EXPLODES! Game over.</p>")
			//change the background color to flash white slowly, then black. 
			//all text in red then reveal explosion video.
			break;			
	}
}


function getHint() {
	if (guessCount === 0) {
		return alert("The game is over. To start again, click the 'Shutdown' button");
	}
	var rand = 3 + Math.floor(Math.random()*17);
	$(".message_box").empty();
	if ((rand + keyNumber) > 100) {
		$(".message_box").append(document.createTextNode("Your observations suggest that the attunement number is somewhere between: "+(keyNumber-rand)+" and 100."));
	}
	else if ((keyNumber-rand) < 0) {
		$(".message_box").append(document.createTextNode("Your observations suggest that the attunement number is somewhere between: 0 and "+(keyNumber+rand)));
	}
	else {
		$(".message_box").append(document.createTextNode("Your observations suggest that the attunement number is somewhere between: "+(keyNumber-rand)+" and "+(keyNumber+rand)+"."));
	}
	guessCount--;
	$(".message_box").append(document.createTextNode("Attempts Remaining: "+guessCount))
	
	switch(guessCount) {
		case 5:
			$(".message_box").append("<p>The reactor is stable.</p>")
			break;
		case 4:
			$(".message_box").append("<p>The reactor shudders, but remains stable.</p>")
			break;
		case 3:
			$(".message_box").append("<p>The reactor creaks loudly. It is barely stable.</p>")
			break;
		case 2:
			$(".message_box").append("<p>The reactor emits a loud groan. It is unstable.</p>")
			break;
		case 1:
			$(".message_box").append("<p>The reactor shakes violently. It is highly unstable!</p>")
			break;
		case 0:
			$(".message_box").append("<p>THE REACTOR EXPLODES! Game over.</p>")
			//change the background color to flash white slowly, then black. 
			//all text in red then reveal explosion video.
			break;		
	}
}

function newGame() {
	//Check: are you sure? (change the button to green "Are you Sure?" then wait for click to confirm.)
	$(".message_box").empty();
	$(".message_box").append(document.createTextNode("You shut down the reactor. The proper attunement level was "+keyNumber+"."));
	$(".message_box").append(document.createTextNode("The reactor is stable again."));
	//Reset all variables and clear all containers.
	$(".tracker").empty();
	$(".key_number").empty();
	guessList = [];
	guessCount = 5;
	keyNumber = numGen();
}