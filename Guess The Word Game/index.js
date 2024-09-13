const inputs = document.querySelector('.word');
const hintTag = document.querySelector('.hint span');
const guessLeft = document.querySelector('.guess span');
const mistakes = document.querySelector('.wrong span');
const resetBtn = document.querySelector('.reset');
const hintBtn = document.querySelector('.showhint');
const hintElement = document.querySelector('.hint');
const typeInput = document.querySelector('.type-input');

let word;
let incorrectLetters = [];
let correctLetters = [];
let maxGuesses;

//select random word from word list and set up game

function setupGame() {
  alert('Game is starting! Guesss New Word');

  //Hide hint element
  hintElement.style.display = 'none';
  hintElement.style.opacity = '0';

  //choose random word from word list db and setupgame
  const randWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = randWord.word;

  //set hint: if word chars >=5 the max guess = 8 else max guess = 6

  if (word.length >= 5) {
    maxGuesses = 8;
  } else {
    maxGuesses = 6;
  }

  incorrectLetters = [];
  correctLetters = [];
  hintTag.innerText = randWord.hint;
  guessLeft.innerText = maxGuesses;
  mistakes.innerText = incorrectLetters;

  //clear input value and create input for each letter in word

  inputs.innerHTML = '';

  for (let i = 0; i < word.length; i++){
    const input = document.createElement('input');
    input.type = 'text';
    input.disabled = true;
    inputs.appendChild(input);
  }
}

//Handle input from user and update game stats

function handleInput(e){

  //We need to ignore non-letter inputs and letters that have already been guessed

  const key = e.target.value.toLowerCase();

  if(key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)){
    //Check if the letter is in the word
    if(word.includes(key)){
      //update correct guesses

      for (let i=0; i < word.length; i++){
        if(word[i] === key){

          inputs.querySelectorAll('input')[i].value += key;
            console.log(inputs);
        }
      }

      correctLetters += key;
    }else{
      //update incorrect guesses
      maxGuesses--;
      incorrectLetters.push(`${key}`);
      mistakes.innerText = incorrectLetters;

    }
  }

  //Update remaining guess and track for win lose condition

  guessLeft.innerText = maxGuesses;
  if(correctLetters.length === word.length){
    alert(`You Win! ${word.toUpperCase()}`);
    setupGame();
  }else if (maxGuesses < 1){
    alert("Game Over! You Dont Have Any Guesses Left");

    for(let i; i < word.length; i++){
      //Fill inputs with correct words
      inputs.querySelectorAll('input')[i].value = word[i];
    }
  }

  typeInput.value = "";
}

//Handle hint button click

function showhandleHint(){
  hintElement.style.display = 'block';
  hintElement.style.opacity = '1';
}

//Handle reset button click
resetBtn.addEventListener('click', setupGame);
hintBtn.addEventListener('click', showhandleHint);
typeInput.addEventListener('input', handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());


setupGame();
