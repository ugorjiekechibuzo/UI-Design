const taskInput = document.querySelector('.task-input input');
const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-btn');
const taskBox = document.querySelector('.task-box');


let editId = null;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem('todos-list'));

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelector(' .filters span.active').classList.remove('active');
    filter.classList.add('active');

    showTodo(filter.id)
  });
});

function showTodo(filter){
  let liTag = '';
  if(todos){
    todos.forEach((todo, id) => {
      let completed = todo.completed ? 'checked' : '';
      if(filter == todo.status || filter == "all"){
        liTag = liTag + `<li class ="task">
        <label for="${id}">
          <input  onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
           <p class="${completed}">${todo.name}</p>
        </label>

        <div class="settings">
          <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>

          <ul class="task-menu">
            <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
            <li onclick="deleteTask(${id}, '${filter}' )"><i class="fa-solid fa-trash-can"></i>Delete</li>
          </ul>
        </div>

        </li>`;



      }
    })
  }

  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
  let checkTask = taskBox.querySelectorAll('.task');
  !checkTask.length ? clearAll.classList.remove('active') : clearAll.classList.add('active');
  taskBox.offsetHeight >=300 ? taskBox.classList.add('overflow') : taskBox.classList.remove('overflow');
}

showTodo('all');

function showMenu(selectedTask){
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener('click', (e) => {

    let condition = e.target.tagName != "I" && e.target.tagName != selectedTask;
    if(condition){
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask){
  let taskName = selectedTask.parentElement.lastElementChild;
  if(selectedTask.checked){
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  }else{
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending';
  }
  localStorage.setItem('todos-list', JSON.stringify(todos));
}

function editTask(taskid, textName){
  isEditTask = true;
  editId = taskid;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add('active');
}

function deleteTask(deleteid, filter){
  isEditTask = false;
  todos.splice(deleteid, 1);
  localStorage.setItem('todos-list', JSON.stringify(todos));
  showTodo(filter);
}

clearAll.addEventListener('click', () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem('todos-list', JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener('keyup', (e) => {
  const spanActive = document.querySelector('span.active').id;
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask){
    if(!isEditTask){
      todos = !todos ? [] : todos;
      let newTask = {
        name: userTask,
        status: 'pending',
      };
      todos.push(newTask);
    }else{
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = '';
    localStorage.setItem('todos-list', JSON.stringify(todos));
    showTodo(spanActive);

  }
});
