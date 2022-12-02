const btns = document.querySelectorAll(".btn");
const box = document.querySelector(".para");

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    playRound(btn.textContent, getComputerChoice());
    reset();
  });
});

function getComputerChoice() {
  //Options computer can "pick"
  let options = ["rock", "paper", "scissors"];
  
  //Randomly generate and index from 0 to 2 
  let randNum = Math.floor(Math.random()*3);
  
  //Return a random element from options array 
  //utilizing random number from randNum 
  return options[randNum];
}

function playRound(playerSelection, computerSelection) {  
  //Main logic to get the message who wins the round
  //and return value to later determine who increments the score
  if (playerSelection === computerSelection) {
    rounds++;
    box.textContent = `It's a tie!. Both picked a ${playerSelection}.`;
    document.getElementById("round").innerHTML = "Round:  " + rounds;
    document.getElementById("score-player").innerHTML = "Player:  " + playerScore;
    document.getElementById("score-pc").innerHTML = "Computer:  " + computerScore;
  } else if (
    (playerSelection === 'paper' && computerSelection === 'scissors') || 
    (playerSelection === 'rock'  && computerSelection === 'paper') ||
    (playerSelection === 'scissors' && computerSelection === 'rock') ) {
      rounds++;
      computerScore++;
      box.textContent = `You lose! Computer's ${computerSelection} beats your ${playerSelection}.`;
      document.getElementById("round").innerHTML = "Round:  " + rounds;
      document.getElementById("score-player").innerHTML = "Player:  " + playerScore;
      document.getElementById("score-pc").innerHTML = "Computer:  " + computerScore;
  } else {
      box.textContent = `You win! Your ${playerSelection} beats computer's ${computerSelection}.`;
      rounds++;
      playerScore++;
      document.getElementById("round").innerHTML = "Round:  " + rounds;
      document.getElementById("score-player").innerHTML = "Player:  " + playerScore;
      document.getElementById("score-pc").innerHTML = "Computer:  " + computerScore;
    }
}

function reset() {
  //Final message to get to know who won the game
  if(rounds === 10) {
    if(playerScore === computerScore) {
      box.textContent = `After ${rounds} epic rounds...It's a TIE!!! \n ${playerScore} : ${computerScore}`;
    } else if(playerScore > computerScore) {
      box.textContent = `After ${rounds} epic rounds...Player WINS!!! \n ${playerScore} : ${computerScore}`;
    } else {
      box.textContent = `After ${rounds} epic rounds...Computer WINS!!! \n ${computerScore} : ${playerScore}`;
    }
    rounds = 0;
    playerScore = 0;
    computerScore = 0;
    document.getElementById("round").innerHTML = "Round:  " + rounds;
    document.getElementById("score-player").innerHTML = "Player:  " + playerScore;
    document.getElementById("score-pc").innerHTML = "Computer:  " + computerScore;
  }
}

