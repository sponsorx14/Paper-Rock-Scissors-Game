const newGameBtn = document.getElementById('js-newGameButton');
const pickRock = document.getElementById('js-playerPick_rock');
const pickPaper = document.getElementById('js-playerPick_paper');
const pickScissors = document.getElementById('js-playerPick_scissors');
const newGameElem = document.getElementById('js-newGameElement');
const pickElem = document.getElementById('js-playerPickElement');
const resultsElem = document.getElementById('js-resultsTableElement');
const playerPointsElem = document.getElementById('js-playerPoints');
const playerNameElem = document.getElementById('js-playerName');
const computerPointsElem = document.getElementById('js-computerPoints');
const playerPickElem = document.getElementById('js-playerPick');
const computerPickElem = document.getElementById('js-computerPick');
const roundScore = document.querySelector('#js-roundResult');
const winnerInfo = document.getElementById('js-winnerInfo');
let isActive = false;
let gameState = 'notStarted',
    player = {
        name: '' ,
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
  playerName = prompt('Please enter your name.', 'Player1');
  if (playerName) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = playerName;
    setGamePoints();
  }
}

function getComputerPick() {
    let possiblePicks = ['Rock', 'Paper', 'Scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick){
  roundScore.innerHTML = '';
  let winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone';
  } else if (
    (computerPick == 'Rock' && playerPick == 'Scissors') ||
    (computerPick == 'Scissors' && playerPick == 'Paper') ||
    (computerPick == 'Paper' && playerPick == 'Rock')) {

    winnerIs = 'computer';
  }
  if (winnerIs == 'player'){
    roundScore.innerHTML = playerName + ' Win!';
    player.score++;
  } else if (winnerIs == 'computer'){
    roundScore.innerHTML = 'Computer Win!';
    computer.score++;
  } else {
    roundScore.innerHTML = 'Draw!';
  }
  gameOver();
  setGamePoints();
}
function playerPick(playerPick){
  let computerPick = getComputerPick();
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
  playerPick('Rock');
});

pickPaper.addEventListener('click', function(){
  playerPick('Paper');

});

pickScissors.addEventListener('click', function(){
  playerPick('Scissors');
});
