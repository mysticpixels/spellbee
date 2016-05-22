/*=========================================================================
=            THe behaviour layer of 'Spell the object' game            =
==========================================================================*/

// the game object
var theGame = {

	// array of url and name of the pic to match
	names : [ 'diya', 'rocket', 'monkey', 'apple', 'orange', 'car', 'school', 'police', 'tree', 'cow' ],

	// task status number
	status : 0,

	// keystroke order array
	keyStrokeOrder : [],

	// keyedin string per session
	keyedInString : "",

	/*----------  DOM object initialisations  ----------*/

	// pic which is to be spelled
	pic : document.getElementById("objectToSpell"),

	// keyboard
	keyBoard : document.getElementById("keyBoard"),

	// reset link	
	resetLink : document.getElementById("reset"),

	// next link	
	nextLink : document.getElementById("next"),

	// submit action button
	submitAction : document.getElementById("submitAction"),

	// keyedin string display header
	keyedStringDisplay : document.getElementById("keyedStringDisplay"),

	// the ul element of keyboard
	keyBoardUL : document.getElementById("keyBoardUL"),


	/*----------   method to reset the keyboard  ----------*/
	reset : function(){

		theGame.keyStrokeOrder=[];
		theGame.keyedInString="";

		//  removing classname 'active' from all li tags of keyboard
		for(var i=0;i<keyBoard.querySelectorAll('a').length;i++){
			keyBoard.querySelectorAll('a')[i].parentNode.className="";
		}
		theGame.keyedStringDisplay.innerHTML="";
	},

	/*----------   next image detail loaded  ----------*/
	next : function(){
		if(theGame.status<theGame.names.length-1){
			console.log(theGame.keyedInString);
			theGame.keyStrokeOrder=[];
			theGame.keyedInString="";
			var imgSrc="images/"+theGame.names[theGame.status+1]+".jpg";
			theGame.status++;
			theGame.pic.querySelectorAll('img')[0].setAttribute('src', imgSrc);	
			theGame.clearKeyboard();
			theGame.clearDisplay();
			theGame.populateKeyBoard();
		}
		return;
	},

	/*----------  submitting the spelling of the object  ----------*/
	submitSpelling : function(){

		console.log(theGame.keyedInString);
		if (theGame.keyedInString == theGame.names[theGame.status])
			console.log('Success');
		else
			console.log('try again another time');
	},
	

	/*----------  populating the first image  ----------*/
	populateImage : function(){
		var startingPic = document.createElement('img');
		var imgSrc="images/"+theGame.names[theGame.status]+".jpg";
		startingPic.setAttribute("src", imgSrc );
		theGame.pic.appendChild(startingPic);
	},

	/*----------   populating the keyboard keys with random alphabets  ----------*/

	// todo: add the first image also on first load ... rt now its hard coded in the markup
	populateKeyBoard : function(e){
		var i, j, k, temp, ambiguity,
		alphabetList=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		nameWord=[],
		randomer=[]; // array which will hold all the unique random numbers for placing the alphabets in the keyboard

		// generating 15 keys in the form of UL and LI and anchortags
		for (i=0; i<15/*(theGame.names[theGame.status].length+5)*/	; i++) {
			var listItem = document.createElement('li');
			var anchorItem = document.createElement('a');

			// attaching eventlisteners while the elements are created
			anchorItem.addEventListener('click', theGame.keyIn, 'false');
			anchorItem.setAttribute('href', '#');
			anchorItem.innerHTML=alphabetList[Math.round(Math.random()*25)];
			keyBoardUL.appendChild(listItem);
			listItem.appendChild(anchorItem);
		};

		// creating an array with individual alphabets of each names so that it can be randomly placed in the keyboard
		for (j = 0; j < theGame.names[theGame.status].length; j++) {
			nameWord.push(theGame.names[theGame.status][j]);
		};

		// generating unique random numbers, and saving those in an array 'randomer'
		while ((randomer.length)<(nameWord.length)) {
			temp=Math.round(Math.random()*14); //generating a random number <= the total number of keys in the board
			ambiguity=false; // setting a flag variable which checks for repeating random numbers
			for(k=0; k<nameWord.length; k++){ // looping through all the elements in the array, which will store the unique random numbers
				if(randomer[k]==temp){ // checking if any of the array item is the same as the random number generated above
					ambiguity=true; // if yes, the flag is set to true
					break; // and the loop is broken
				}
			}
			if(!ambiguity){ // only if the flag value is false, 
				randomer.push(temp); // the unique random number generated is pushed to the array of unique random numbers
			}
		}

		// placing alphabet-wise in each of the anchor tags, with the generated random numbers as their position in the child DOM order
		for(k=0; k<randomer.length; k++){
			keyBoardUL.children[randomer[k]].children[0].innerHTML=nameWord[k];
		}
	},

	/*----------  clear all keyboard markup  ----------*/
	clearKeyboard : function(e){

		// storing the total number of keys in the current keyboard
		var keyCount = theGame.keyBoardUL.children.length,
		i;

		// removing all the key DOM elements in the keyboard
		for (i = keyCount-1; i >= 0; i--) {
			theGame.keyBoardUL.children[i].parentNode.removeChild(theGame.keyBoardUL.children[i]);//todo: not necessary to remove li DOM elements, just remove the className
		}
	},

	/*----------  clearing the header display  ----------*/
	clearDisplay : function(e){
		theGame.keyedStringDisplay.innerHTML="";
	},

	/*----------  all the action that happens while the keys are pressed in the keyboard  ----------*/
	keyIn : function(e){
		var eventName=e;

		// recording the key press order in the array object keyStrokeOrder
		theGame.keyStrokeOrder.push(e.currentTarget.parentNode.children[0].innerHTML);
		theGame.keyedInString=theGame.keyStrokeOrder.join('');
		// console.log(theGame.keyStrokeOrder.join(''));
		
		// in case the key is a fresh press
		if(e.currentTarget.parentNode.className!='active'){
			e.currentTarget.parentNode.className+='active';
			theGame.keyedStringDisplay.innerHTML+=e.currentTarget.text;
		}
	},

	/*----------  the start of all fun ;)  ----------*/
	startUp : function(e){

		//loading the picture and setting the count
		theGame.status=0; //todo: no need to set it at the first load

		// populate the image
		theGame.populateImage();

		// populating the keyboard
		theGame.populateKeyBoard();

		// attaching the click event to each keys in the keyboard
		for(var i=0;i<keyBoard.querySelectorAll('a').length;i++){
			keyBoard.querySelectorAll('a')[i].addEventListener('click', theGame.keyIn, 'false');
		}

		// resetting the keyboard
		theGame.resetLink.addEventListener('click', theGame.reset, 'false');

		//attaching listener to next link
		theGame.nextLink.addEventListener('click', theGame.next, 'false');

		//attaching listener to submit button
		theGame.submitAction.addEventListener('click', theGame.submitSpelling, 'false');

	}
}

// onload triggers
window.onload = function(){
	theGame.startUp();
};
