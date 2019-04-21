//variables
var scores, roundScore, isPlaying;
init();
//function init
function init() {
  //two player score
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  //hide dice
  document.querySelector('.dice-img').style.display = 'none';
  //numbers to 0
  document.querySelector('.player-totalScore-0').textContent = '0';
  document.querySelector('.player-totalScore-1').textContent = '0';
  document.querySelector('.player-currentScore-0').textContent = '0';
  document.querySelector('.player-currentScore-1').textContent = '0';
  document.querySelector(`.player-name-0`).textContent = 'Player1';
  document.querySelector(`.player-name-1`).textContent = 'Player2';
  document.querySelector(`.player-name-1`).classList.remove('winner');
  document.querySelector(`.player-name-0`).classList.remove('winner');

  document.querySelector(`.player-panel-0`).classList.add('active');
  document.querySelector(`.player-panel-1`).classList.remove('active');
}
//roll dice function
function btn() {
  if (isPlaying) {
    //random dice number
    var dice = Math.floor(Math.random() * 6 + 1);
    //display dice
    var diceDOM = document.querySelector('.dice-img');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;
    //current Score update
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        `.player-currentScore-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
}

//event roll dice
document.querySelector('#roll-dice').addEventListener('click', btn);
//hold event
document.querySelector('#hold-dice').addEventListener('click', function() {
  if (isPlaying) {
    //add current Score to global score
    scores[activePlayer] += roundScore;

    //update ui
    document.querySelector(`.player-totalScore-${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player win the game
    if (scores[activePlayer] >= 10) {
      document.querySelector(`.player-name-${activePlayer}`).textContent =
        'Winner!';
      document.querySelector('.dice-img').style.display = 'none';
      document;
      document
        .querySelector(`.player-panel-${activePlayer}`)
        .classList.remove('active');
      document
        .querySelector(`.player-name-${activePlayer}`)
        .classList.add('winner');
      isPlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next player
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  //roundScore back to 0;
  roundScore = 0;
  document.querySelector(`.player-currentScore-0`).textContent = '0';
  document.querySelector(`.player-currentScore-1`).textContent = '0';
  //toggle active class on panel
  document.querySelector('.player-panel-0').classList.toggle('active');
  document.querySelector('.player-panel-1').classList.toggle('active');
}
//new game
document.querySelector('.new-game').addEventListener('click', init);

document.addEventListener('DOMContentLoaded', () => {
  alert('1)Score 50 To Win(2)Player Changes At Dice=1(3)Hold To Add Score');
});
