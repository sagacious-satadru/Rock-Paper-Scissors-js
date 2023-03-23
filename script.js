/*
  Rock Paper Scissors 🪨(✊) 📜(🤚) ✂️(✌️)
*/

// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Scissors'
const totalScore = { computerScore: 0, playerScore: 0 };
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}
// console.log(getComputerChoice())

// ** getResult will compare playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0

function getResult(playerChoice, computerChoice) {
  // we return the result of score based on if we won, drew, or lost
  let score;

  // All situations where human draws, we set the `score` to 0
  if (playerChoice == computerChoice) {
    score = 0;
  } // All situations where human wins, we set `score` to 1
  else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
    score = 1;
  }
  else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
    score = 1;
  }
  else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
    score = 1;
  } // Otherwise human loses (hence we set the score to -1)
  else // the scenario(s) where the human loses
  {
    score = -1;
  }

  // return score
  return score;

}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {

  const resultDiv = document.getElementById('result');
  const handsDiv = document.getElementById('hands');
  const playerScoreDiv = document.getElementById('player-score');
  const computerScoreDiv = document.getElementById('computer-score')
  if (score < 0) {     
    resultDiv.innerText = "You Lose!";
  }
  else if (score == 0) {      
    resultDiv.innerText = "It's a tie";
  }
  else {     
    resultDiv.innerText = "You Won!";
  }
  // handsDiv.innerText = `👨🏻/👩🏻 ${playerChoice} vs 🤖 ${computerChoice}`;
  handsDiv.innerText = "👨🏻/👩🏻" + playerChoice + " vs " + "🤖" + computerChoice;
  playerScoreDiv.innerText = `Your score : ${totalScore['playerScore']}`;
  computerScoreDiv.innerText = `Computer's score : ${totalScore['computerScore']}`
  
}

// ** Calculating who won and showing it on the screen **
function onClickRPS(playerChoice) {
  
  const computerChoice = getComputerChoice();  
  const score = getResult(playerChoice, computerChoice);
  totalScore['playerScore'] += score;
  totalScore['computerScore'] += -(score);  
  showResult(score, playerChoice, computerChoice);
}


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  // we use a querySelector to select all RPS Buttons
  const rpsButtons = document.querySelectorAll('.rpsButton');
  // * Adding an on click event listener to each RPS button and every time we click it, it calls the onClickRPS function with the RPS button that was last clicked *

  // 1. We loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument
  rpsButtons.forEach(rpsButton => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value);

  // We add a click listener to the end game button that runs the endGame() function on click
    const endGameButton = document.getElementById('endGameButton')
    endGameButton.onclick = () => endGame(totalScore)
  })


}

// ** endGame function clears all the text on the DOM **
function endGame(totalScore) {
  totalScore['playerScore'] = 0
  totalScore['computerScore'] = 0
  const resultDiv = document.getElementById('result');
  const handsDiv = document.getElementById('hands');
  const playerScoreDiv = document.getElementById('player-score');
  const computerScoreDiv = document.getElementById('computer-score');
  resultDiv.innerText = ''
  handsDiv.innerText = ''
  playerScoreDiv.innerText = ''
  computerScoreDiv.innerText = ''
}

playGame()