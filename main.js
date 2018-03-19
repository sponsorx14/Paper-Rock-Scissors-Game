var newGameBtn = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
var winnerInfo = document.getElementById('js-winnerInfo');
var isActive = false;
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// FUNCTIONS

function setGameElements(){
  switch (gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      break;
    case 'ended':
      newGameBtn.innerText = 'Try again?';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

function newGame(){
  playerName = prompt('Please enter your name.');
  if (playerName) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = playerName;
    setGamePoints();
  }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick){
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  var winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone';
  } else if (
    (computerPick == 'rock' && playerPick == 'scissors') ||
    (computerPick == 'scissors' && playerPick == 'paper') ||
    (computerPick == 'paper' && playerPick == 'rock')) {

    winnerIs = 'computer';
  }
  if (winnerIs == 'player'){
    playerResultElem.innerHTML = 'Win!';
    player.score++;
  } else if (winnerIs == 'computer'){
    computerResultElem.innerHTML = 'Win!';
    computer.score++;
  }
  gameOver();
  setGamePoints();
}
function playerPick(playerPick){
  var computerPick = getComputerPick();
  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;
  checkRoundWinner(playerPick, computerPick);
}

function setGamePoints(){
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
}

function gameOver(){
  if (player.score == 10){
    winnerInfo.innerHTML = playerName + ' won!';
    gameState = 'ended';
    setGameElements();
  } else if (computer.score == 10){
    winnerInfo.innerHTML = 'Computer won!';
    gameState = 'ended'
    setGameElements();
  }
}

setGameElements();

// EVENT LISTENERS
newGameBtn.addEventListener('click', function(){
  newGame();
});

pickRock.addEventListener('click', function(){
  playerPick('rock');
});

pickPaper.addEventListener('click', function(){
  playerPick('paper');

});

pickScissors.addEventListener('click', function(){
  playerPick('scissors');
});
