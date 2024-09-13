document.addEventListener('DOMContentLoaded', () => {

const container = document.querySelector('.container');
const addQuestionModal = document.getElementById('add-question-card');
const saveButton = document.querySelector('#save-btn');
const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const errorMessage =document.querySelector('#error');
const addQuestion = document.querySelector('#add-flashcard');
const closeBtn = document.querySelector('#close-btn');


let editMode = false;

let originalId = null;

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
addQuestion.addEventListener('click', () => {
  container.classList.add('hide');
  question.value = '';
  answer.value = '';
  addQuestionModal.classList.remove('hide');
});

closeBtn.addEventListener('click', () => {
   // Close the add question card and show the container
  container.classList.remove('hide')
  addQuestionModal.classList.add('hide');
  console.log(editMode);
  if(editMode){
    editMode = false;
  }
})

saveButton.addEventListener("click", () => {
  let tempQuestion = question.value.trim();
  let tempAnswer = answer.value.trim();

  if (tempQuestion === '' || tempAnswer === '') {
    errorMessage.classList.remove('hide');
    return;
  }else{
    if(editMode){
      flashcards = flashcards.filter((flashcard) => flashcard.id !== originalId);

    }

    let id = Date.now();

    // Add the new flashcard to the array
    flashcards.push({id, question: tempQuestion, answer: tempAnswer});
    // Save the flashcards array to local storage
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    errorMessage.classList.add('hide');
    viewlist();
    question.value = '';
    answer.value = '';
    editMode = false;
    addQuestionModal.classList.add('hide');
  }

});


function viewlist(){
  const listCard = document.querySelector('.card-list-container');
  listCard.innerHTML = '';
  flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.forEach(flashcard => {

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <p class="question-div">${flashcard.question}</p>
    <p class="answer-div hide">${flashcard.answer}</p>
    <a href="#" class="show-hide-btn">Show/Hide</a>
    <div class="buttons-con">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    `
    div.setAttribute('data-id', flashcard.id);
    const displayAnswer = div.querySelector(".answer-div");
    const showHideBtn = div.querySelector(".show-hide-btn");
    const editButton = div.querySelector(".edit");
    const deleteButton = div.querySelector(".delete");

    showHideBtn.addEventListener('click', () => {

      displayAnswer.classList.toggle('hide');

    });

    editButton.addEventListener('click', () => {
      editMode = true;
      modifyQuestion(editButton, true);
      addQuestionModal.classList.remove('hide');
    });

    deleteButton.addEventListener('click', () => {
      modifyQuestion(deleteButton);
    });

    listCard.appendChild(div);
  })
}

const modifyQuestion = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;

  if (!parentDiv) {
    console.error('Parent element not found!');
    return;
  }


  const id = Number(parentDiv.getAttribute('data-id'));
  const parentQuestion = parentDiv.querySelector('.question-div').innerText;
  const parentAnswer = parentDiv.querySelector('.answer-div').innerText

  if(edit){
    if(!parentAnswer){
      console.error('Parent answer not found!');
      return;
    }
    question.value = parentQuestion;
    answer.value = parentAnswer;
    originalId = id;
    disableButton(true);
  }else{
     // Remove the flashcard from the array and update local storage
    flashcards = flashcards.filter((flashcard) => flashcard.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

  }

  parentDiv.remove();
};

const disableButton = (disable) => {
  const editButton = document.querySelectorAll('.class');
  editButton.forEach(button => {
    button.disabled = disable;
  });
}

viewlist();
});
