// Colors //
var red = '#f00';
var orange = '#f60';
var yellow = '#fe0';
var green = '#3f0';
var indigo = '#0fc';
var blue = '#08f';
var blurple = '#40f';
var purple = '#c0f';
var pink = '#f0c';

var arrangedArr = [red, red, orange, orange, yellow, yellow, green, green, indigo, indigo, blue, blue, blurple, blurple, purple, purple, pink, pink];
var randomizedArr = [];


randomize();

// Function creates a random version of the arranged array above //
function randomize() {
  randomizedArr = [];
  for (var i = 0; i < arrangedArr.length; i) {
    var n = Math.floor(Math.random() * arrangedArr.length);
    randomizedArr.push(arrangedArr[n]);
    arrangedArr.splice(n, 1);
  }
  colorCards();
}

// Function to add randomized array of colors to the cards on the page
function colorCards() {
  for (var l = 0; l < 18; l++) {
    var x = document.getElementById(l);
    x.style.backgroundColor = randomizedArr[l];
  }
}

var a = '',
  b = '',
  aCard = '',
  bCard = '',
  aCardCover = '',
  bCardCover = '',
  count = 0;

// Reset function for the game
function reset() {
  arrangedArr = [red, red, orange, orange, yellow, yellow, green, green, indigo, indigo, blue, blue, blurple, blurple, purple, purple, pink, pink];
  a = '';
  b = '';
  aCard = '';
  bCard = '';
  aCardCover = '';
  bCardCover = '';
  count = 0;
  randomize();
  addCards();
  document.getElementById('win-screen').style.zIndex = '-1';
  return;
}

// Function called within reset to add the cards back on the board if they have already been removed
// Cards are only made to look removed by setting opacity to 0, this sets them back to 1
function addCards() {
  var z = '';
  for (var b = 0; b < 18; b++) {
    z = 'c' + b;
    document.getElementById(z).style.opacity = 1;
    document.getElementById(b).style.opacity = 1;
    document.getElementById(b).className = 'card';
  }
}

var cardElement = document.getElementsByClassName('card-cover');
cardElement.addEventListener('click', cardNumber(this));

// Main matching function called by each click; 1st click stores to 'a' variables then 2nd click compares to 'b' variables
// which then call different functions based on result

function cardNumber(cardName) {
  var w = cardName.id.split('');
  w.shift();
  var q = w.join('');
  if (a === '') {
    a = randomizedArr[q];
    aCard = q;
    aCardCover = cardName.id;
    flipOut(aCard,aCardCover);
  } else if (a !== '' && b === '') {
    b = randomizedArr[q];
    bCard = q;
    bCardCover = cardName.id;
    flipOut(bCard,bCardCover);
    setTimeout(function() {
      if (a == b && aCard != bCard) {
        // It's a match!
        count++;
        fadeOut(aCard);
        fadeOut(bCard);
        flipIn(aCard,aCardCover);
        flipIn(bCard,bCardCover);
        document.getElementById(aCard).className = 'hide';
        document.getElementById(bCard).className = 'hide';
        a = '';
        b = '';
        aCard = '';
        bCard = '';
        if (count == 9) {
          document.getElementById('completion-time').innerHTML = timeCount;
          document.getElementById('win-screen').style.zIndex = '1';
          return;
        }
      } else {
        // No match and reset :(
        flipIn(aCard,aCardCover);
        flipIn(bCard,bCardCover);
        a = '';
        b = '';
        aCard = '';
        bCard = '';
        return;
      }
    }, 1000);
  }
}

// Functions to make the card look like it's being flipped
function flipOut(passedId,passedCover) {
  var color = document.getElementById(passedId);
  var cover = document.getElementById(passedCover);
  color.style.transform = 'rotatey(180deg)';
  color.style.transitionDuration = '0.5s';
  cover.style.opacity = 0;
  cover.style.transform = 'rotatey(180deg)';
  cover.style.transitionDuration = '0.5s';
}

function flipIn(passedId,passedCover) {
  var color = document.getElementById(passedId);
  var cover = document.getElementById(passedCover);
  color.style.transform = 'rotatey(0deg)';
  color.style.transitionDuration = '0.5s';
  cover.style.opacity = 1;
  cover.style.transform = 'rotatey(0deg)';
  cover.style.transitionDuration = '0.5s';
}

// Function to fade element out
function fadeOut(passedCover) {
  var elem = document.getElementById(passedCover);
  var pos = 1;
  var id = setInterval(frame, 50);
  function frame() {
    if (pos < 0) {
      clearInterval(id);
    } else {
      pos = pos - 0.1;
      elem.style.opacity = pos;
    }
  }
}

// Function to fade element in
function fadeIn(passedCover) {
  var cover = document.getElementById(passedCover);
  var pos = 0;
  var id = setInterval(frame, 50);
  function frame() {
    if (pos > 1) {
      clearInterval(id);
    } else {
      pos = pos + 0.1;
      elem.style.opacity = pos;
    }
  }
}

// Timer functions, timer reads what text is on the button to end it and reset

var timeCount = 0;

function timer() {
  reset();
  buttonChange();
  var buttonId = document.getElementById('timer-button');
  var elem = document.getElementById('timer');
  timeCount = 0;
  var timerId = setInterval(second, 1000);
    function second() {
      if (count == 9 || buttonId.innerHTML === 'Start') {
        clearInterval(timerId);

      } else {
        timeCount++;
        elem.innerHTML = timeCount;
      }
    }
}

function buttonChange() {
  var buttonId = document.getElementById('timer-button');
  if (buttonId.innerHTML === 'Start') {
    buttonId.innerHTML = 'Reset';
  }
  else if (buttonId.innerHTML === 'Reset'){
    document.getElementById('timer').innerHTML = '0';
    buttonId.innerHTML = 'Start';
  }
}

function tryAgain() {
  var buttonId = document.getElementById('timer-button');
  document.getElementById('completion-time').innerHTML = '0';
  buttonId.innerHTML = 'Start';
}
