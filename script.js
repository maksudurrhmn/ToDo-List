// Needed html elements
let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let todoList = document.getElementById('todo-list');

let todoEdit = null; // store the element being edited

// Create or Edit todo
function addTodo() {
  let todo = todoInput.value.trim();

  // Validation
  if (todo === '') {
    alert('Add a ToDo');
    return;
  }

  // --- EDIT MODE ---
  if (addBtn.innerText === 'Edit' && todoEdit !== null) {
    let oldValue = todoEdit.target.parentNode.previousElementSibling.innerText;

    // Update UI
    todoEdit.target.parentNode.previousElementSibling.innerText = todo;

    // Update LocalStorage
    editTodos(oldValue, todo);

    // Reset
    addBtn.innerText = 'Add';
    todoEdit = null;
    todoInput.value = '';
    return;
  }

  // --- ADD MODE ---
  let list = document.createElement('li');
  let p = document.createElement('p');
  let div = document.createElement('div');
  let editBtn = document.createElement('button');
  let deleteBtn = document.createElement('button');

  editBtn.innerText = 'Edit';
  deleteBtn.innerText = 'Delete';

  list.classList.add('list');
  editBtn.classList.add('edit-btn', 'btn');
  deleteBtn.classList.add('delete-btn', 'btn');

  p.textContent = todo;
  div.append(editBtn, deleteBtn);
  list.append(p, div);
  todoList.appendChild(list);

  saveTodos(todo);
  todoInput.value = '';
}

// Update todo items (edit & delete)
function updateTodo(e) {
  // Delete
  if (e.target.innerText === 'Delete') {
    let li = e.target.parentNode.parentElement;
    deleteTodos(li);
    li.remove();
  }

  // Edit
  if (e.target.innerText === 'Edit') {
    todoInput.value = e.target.parentNode.previousElementSibling.innerText;
    addBtn.innerText = 'Edit';
    todoEdit = e;
  }
}

// Save todos to LocalStorage
function saveTodos(text) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(text);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from LocalStorage at start
function getTodos() {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.forEach((tds) => {
    let list = document.createElement('li');
    let p = document.createElement('p');
    let div = document.createElement('div');
    let editBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    editBtn.innerText = 'Edit';
    deleteBtn.innerText = 'Delete';

    list.classList.add('list');
    editBtn.classList.add('edit-btn', 'btn');
    deleteBtn.classList.add('delete-btn', 'btn');

    p.textContent = tds;
    div.append(editBtn, deleteBtn);
    list.append(p, div);
    todoList.appendChild(list);
  });
}

// Delete todo from LocalStorage
function deleteTodos(todoElement) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let text = todoElement.children[0].innerText;

  todos = todos.filter((t) => t !== text);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Edit todo in LocalStorage
function editTodos(oldValue, newValue) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let index = todos.indexOf(oldValue);

  if (index !== -1) {
    todos[index] = newValue;
  }

  localStorage.setItem('todos', JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
