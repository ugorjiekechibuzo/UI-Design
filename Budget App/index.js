let totalAmount = document.getElementById('total-amount');
let userAmount = document.getElementById('user-amount');
const checkAmountButton = document.getElementById('check-amount');
const totalAmountButton = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const errorMessages = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const amount = document.getElementById('amount');
const expenditureValue = document.getElementById('expenditure-value');
const balanceValue = document.getElementById('balance-amount');
const list = document.getElementById('list');

let tempAmount = 0;

//Budget Function
totalAmountButton.addEventListener('click', () =>{

  tempAmount = totalAmount.value;
  if(tempAmount === "" || tempAmount < 0){
    errorMessages.classList.remove('hide');
  }else{
    errorMessages.classList.add('hide');
    amount.textContent = tempAmount;
    balanceValue.textContent = tempAmount - expenditureValue.textContent;
    totalAmount.value = "";
  }
});



//Disable edit and delete button function

const disableButtons = (bool) => {
  let editButtons = document.querySelectorAll('.edit');
  // let deleteButtons = document.querySelectorAll('.delete-button');

  // for(let i = 0; i < editButtons.length; i++){
  //   editButtons[i].disabled = bool;
  //   deleteButtons[i].disabled = bool;
  // }
  editButtons.forEach((button) => {
    console.log(button.disabled = bool);
    button.disabled = bool;
  });

}
//Create list function

const createList = (expenseName, expenseValue) => {
  let subListContent = document.createElement('div');
  subListContent.classList.add('sublist-content', 'flex-space');
  list.appendChild(subListContent);
  subListContent.innerHTML = `<p class="product">${expenseName}</p>
  <p class="amount">${expenseValue}</p>`;

  //create edit button
  let editButton = document.createElement('button');
  editButton.classList.add('fa-solid', "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener('click', () => {
    modifyElement(editButton, true);
  });

  //create delete button
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('fa-solid', "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener('click', () => {
    modifyElement(deleteButton);
  });

  //apendding to the sublist content
  subListContent.appendChild(editButton);
  subListContent.appendChild(deleteButton);
  list.appendChild(subListContent);


}



//modify element function

const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  console.log(parentDiv);
  let currentBalance = balanceValue.textContent;
  let currentExpenditure = expenditureValue.textContent;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if(edit){
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }

  balanceValue.textContent = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.textContent = parseInt(currentExpenditure) - parseInt(parentAmount);
  parentDiv.remove();
}

//Add expense function

checkAmountButton.addEventListener('click', () => {
  //check empty
  if(!userAmount.value || !productTitle.value){
    productTitleError.classList.remove('hide');
    return false;
  }



  //check if amount is greater than balance
  if(parseInt(userAmount.value) > parseInt(balanceValue.textContent)){
    productTitleError.classList.remove('hide');
    return false;
  }

  //Enable buttons
  disableButtons(false);

  //Expense
  let expenditure = parseInt(userAmount.value);

  //Get the Total expense (existing + new)

  let sum = parseInt(expenditureValue.textContent) + expenditure;
  expenditureValue.textContent = sum;

  //Total balance = budget - total expenses

  const totalBalance=  tempAmount - sum;
  balanceValue.textContent = totalBalance;

  //Create list
  createList(productTitle.value, expenditure);

  //Clear input fields
  productTitle.value = "";
  userAmount.value = "";


});
