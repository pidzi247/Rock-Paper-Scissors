let roundContainer = document.createElement("div");
roundContainer.setAttribute("id", "roundContainer");

// DOM handling
const btns = document.querySelectorAll(".btn");
const box = document.querySelector(".para");
const shuffleCompChoice = document.getElementById("cpuChoice");
const playerFinalChoice = document.getElementById("playerChoice");
const hud = document.getElementById("log");
const choiceActive = document.querySelectorAll(".choiceName");
const docWidth = document.querySelector("body");
const logPrompt = document.querySelector(".logPrompt");
const round = document.getElementsByClassName("rounds");

hud.appendChild(roundContainer);

const roundsWrapper = document.getElementById("roundContainer");

// Global variables
let playerScore = 0;
let computerScore = 0;
let rounds = 0;
let timesRun = 0;
let playerCurrentChoice = "";
let computerCurrentChoice = "";

//  Event listeners for log panel and rounds
let logPromptMessage = logPrompt.addEventListener("click", clickablePanel);
let logPanel = hud.addEventListener("click", () => {
  if(docWidth.offsetWidth > 480) {
    clickablePanel();
  } else {
    if(hud.classList.contains("sidebarRollout")) {
      hud.classList.remove("sidebarRollout");
      hud.classList.add("sidebarRollin");
      hud.classList.remove("active");
      roundsWrapper.classList.remove("focused");
      for (let i = 0; i < round.length; i++) {
        round[i].style.visibility = "hidden";
      }
    } else {
      hud.classList.remove("sidebarRollin");
      hud.classList.add("sidebarRollout");
      hud.classList.add("active");
      roundsWrapper.classList.add("focused");
      for (let i = 0; i < round.length; i++) {
        round[i].style.visibility = "visible";
      }
    }
  }
});

// Main game event triggered on click on any of the players icons
let game = btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(docWidth.offsetWidth > 480) {
      hud.style.setProperty("display", "block");
      hud.style.setProperty("visibility", "visible");
    }
    playerCurrentChoice = btn.textContent;
    playerFinalChoice.textContent = playerChoice(btn.textContent);
    playerFinalChoice.style.color = "#48F03D";
    playRound(btn.textContent, getComputerChoice());
    choiceActive.forEach(inactive => {
      inactive.style.color = "grey";
    });
    reset();
    btns.forEach(btn => {
      btn.disabled = true;
      btn.style.pointerEvents = "none";
      btn.style.color = "grey";

    });
    setTimeout(function() {
      shuffleCompChoice.classList.remove("popup");
      playerFinalChoice.classList.remove("popup");
      btns.forEach(btn => {
        btn.style.pointerEvents = "auto";
        btn.removeAttribute('disabled');
        btn.style.color = "#48F03D";
        choiceActive.forEach(inactive => {
          inactive.style.color = "#48F03D";
        });
      });
    }, 2500)
    if(docWidth.offsetWidth < 1025 && docWidth.offsetWidth > 480) {
      setTimeout(function() {
        hud.style.setProperty("display", "none");
        hud.style.setProperty("visibility", "hidden");
      }, 3500)
    }
    if(docWidth.offsetWidth < 480) {
      if(roundsWrapper.classList.contains("focused")) {
        for (let i = 0; i < round.length; i++) {
          round[i].style.visibility = "visible";
        }
      } else {
        for (let i = 0; i < round.length; i++) {
          round[i].style.visibility = "hidden";
        }
      }
    }
  });
});

function getComputerChoice() {
  shuffleCompChoice.classList.add("fa", "fa-3x", "inverted");
  let options = ["rock", "paper", "scissors"];
  
  let randNum = Math.floor(Math.random()*3);
  
  if(randNum === 2) {
    shuffleCompChoice.classList.remove("fa-hand-paper-o", "fa-hand-rock-o");
    shuffleCompChoice.classList.add('fa-hand-scissors-o');
  } else if( randNum === 1) {
    shuffleCompChoice.classList.remove("fa-hand-scissors-o", "fa-hand-rock-o");
    shuffleCompChoice.classList.add('fa-hand-paper-o');
  } else {
    shuffleCompChoice.classList.remove("fa-hand-paper-o", "fa-hand-scissors-o");
    shuffleCompChoice.classList.add('fa-hand-rock-o');
  }
  computerCurrentChoice = options[randNum];
  return options[randNum];
}

function playRound(playerSelection, computerSelection) {
    
  if (playerSelection === computerSelection) {
    rounds++;
    document.getElementById("roundCount").innerHTML = rounds;
    document.getElementById("scorePlayer").innerHTML = "Player:  " + playerScore;
    document.getElementById("scoreCpu").innerHTML = "Computer:  " + computerScore;
    document.querySelector(".roundWinner").innerHTML = "It's a tie!";
    playerFinalChoice.classList.add("popup");
    shuffleCompChoice.classList.add('popup');
  } else if (
    (playerSelection === 'paper' && computerSelection === 'scissors') || 
    (playerSelection === 'rock'  && computerSelection === 'paper') ||
    (playerSelection === 'scissors' && computerSelection === 'rock') ) {
      rounds++;
      computerScore++;
      document.getElementById("roundCount").innerHTML = rounds;
      document.getElementById("scorePlayer").innerHTML = "Player:  " + playerScore;
      document.getElementById("scoreCpu").innerHTML = "Computer:  " + computerScore;
      document.querySelector(".roundWinner").innerHTML = "Computer" + "<br>" + "wins!";
      shuffleCompChoice.classList.add('popup');
  } else {
      rounds++;
      playerScore++;
      document.getElementById("roundCount").innerHTML = rounds;
      document.getElementById("scorePlayer").innerHTML = "Player:  " + playerScore;
      document.getElementById("scoreCpu").innerHTML = "Computer:  " + computerScore;
      document.querySelector(".roundWinner").innerHTML = "Player" + "<br>" + "wins!";
      playerFinalChoice.classList.add("popup");
    }
  let roundLog = document.createElement("div"); 
  roundLog.classList.add("rounds");
  let logMessage = `Player => ${playerCurrentChoice} <br>Comp => ${computerCurrentChoice}<br> Score: ${playerScore} : ${computerScore}<br> ${currentLead(computerScore, playerScore)}`;  
  roundLog.innerHTML = `----------------------<br>&#8595; Round ${rounds} &#8595;<br>
  ${logMessage}`;
  roundContainer.insertBefore(roundLog, roundContainer.firstChild);
}

function reset() {
  if(rounds === 10) {
    document.getElementById("round").style.setProperty("display", "none");
    document.querySelector(".scoreline").style.setProperty("display", "none");
    if(playerScore > computerScore) {
      document.querySelector(".roundWinner").innerHTML = `After 10 epic rounds, Player.<br> Score: ${playerScore} to ${computerScore}!`;
    } else if (playerScore < computerScore) {
      document.querySelector(".roundWinner").innerHTML = `After 10 epic rounds, Computer.<br> Score: ${computerScore} to ${playerScore}!`
    } else {
      document.querySelector(".roundWinner").innerHTML = `After 10 epic rounds...It's a tie!<br> Score: ${playerScore} to ${computerScore}.`
    }
    setTimeout(function() {
      document.getElementById("round").style.setProperty("display", "flex");
      document.querySelector(".scoreline").style.setProperty("display", "block");
      rounds = 0;
      playerScore = 0;
      computerScore = 0;
      document.getElementById("scorePlayer").innerHTML = "Player:  " + playerScore;
      document.getElementById("scoreCpu").innerHTML = "Computer:  " + computerScore;
      document.getElementById("roundCount").innerHTML = rounds;
      document.querySelector(".roundWinner").innerHTML = "";
      hud.replaceChildren();
    }, 4000);
  }
}

function playerChoice(choice) {
  playerFinalChoice.classList.add("fa", "fa-3x");
  if(choice === "scissors") {
    playerFinalChoice.classList.remove("fa-hand-paper-o", "fa-hand-rock-o");
    playerFinalChoice.classList.add('fa-hand-scissors-o');
  } else if( choice === "paper") {
    playerFinalChoice.classList.remove("fa-hand-scissors-o", "fa-hand-rock-o");
    playerFinalChoice.classList.add('fa-hand-paper-o');
  } else {
    playerFinalChoice.classList.remove("fa-hand-paper-o", "fa-hand-scissors-o");
    playerFinalChoice.classList.add('fa-hand-rock-o');
  }
}


// Helper Functions

function currentLead(score1, score2) {
  if(score1 > score2) {
    return "Computer leads!";
  } else if (score1 < score2) {
    return "Player leads!";
  } else {
    return "It is a tie!";
  }
}

function clickablePanel() {
  if(docWidth.offsetWidth > 769) {
    if(hud.classList.contains("expanded")) {
      logPrompt.innerHTML = "GAME LOG<br><br>Click to<br> EXPAND";
      logPrompt.style.setProperty("right", "5.5%");
      hud.classList.add("collapsed");
      hud.classList.remove("expanded");
    } else {
      logPrompt.innerHTML = "GAME LOG<br><br>Click to<br> COLLAPSE";
      logPrompt.style.setProperty("right", "5.5%");
      hud.classList.add("expanded");
      hud.classList.remove("collapsed");
    }
  }
}