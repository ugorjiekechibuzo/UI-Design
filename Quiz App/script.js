const questionElement = document.querySelector(".question p");
const optionsElement = document.querySelector(".options");
const nextButton = document.querySelector(".next-btn");
const quitButton = document.querySelector(".quit-btn");


let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";


async function fetchQuestions() {
  try{
    // const response = await fetch("questions.json");
    // questions = await response.json();
    // displayQuestion();
    const response = await fetch(url);
    const data = await response.json();
    questions = data.results.map((question) => {
      const formattedQuestion = {
        question: question.question,
        correctAnswer: question.correct_answer,
        options: question.incorrect_answers.concat(question.correct_answer)
        // options: [...question.incorrect_answers, question.correct_answer]
      };
      formattedQuestion.options.sort(() => Math.random() - 0.5);
      return formattedQuestion;
    });
    displayQuestion();
  }catch(err){
    console.error("Error fetching question",err);
    questionElement.textContent = "Error fetching question";
  }

}

function displayQuestion() {
  if (questions.length === 0){
    questionElement.textContent = "No questions available";
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) =>{
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener('click', checkAnswer);
    optionsElement.appendChild(button);
  })

  nextButton.style.display = "none";

}

function checkAnswer(event) {
  const choice = event.target.textContent;
  const correctChoice = questions[currentQuestionIndex].correctAnswer;
  if (choice === correctChoice){
    event.target.classList.add("correct");
    score++;
  }else{
    event.target.classList.add("incorrect");
    const buttons = optionsElement.querySelectorAll(".option");
    // for(i = 0; i < buttons.length; i++){
    //   if(buttons[i].textContent === correctChoice){
    //     buttons[i].classList.add("correct");
    //     break;
    //   }
    // }

    buttons.forEach((button) => {
      if(button.textContent === correctChoice){
        button.classList.add("correct");
      }
    });
  }

  const optionButtons = optionsElement.querySelectorAll(".option");
  optionButtons.forEach((button) =>{
    button.disabled = true;
  });

  // for (let i = 0; i < optionButtons.length; i++) {
  //   optionButtons[i].disabled = true;
  // }
  nextButton.style.display = 'block';

}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    displayQuestion();
  }else{
    displayResult()
  }
});

function displayResult() {
  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
  nextButton.style.display = "none";
}

function displayQuitMessage(){
  questionElement.textContent = "You have quit the quiz";
  optionsElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
  nextButton.style.display = "none";
  quitButton.style.display = "none";
}

function resetQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  fetchQuestions();
  quitButton.style.display = "block";}


quitButton.addEventListener("click", () =>{
  if(confirm("Are you sure you want to quit?")){
    displayQuitMessage();
    resetQuiz()
  }
})

fetchQuestions();
