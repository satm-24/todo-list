const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')



// event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


// Functions
function addTodo(event) {


    // prevent form from submitting
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create list of commands
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // check off completed tasks
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clear input value
    todoInput.value = "";

}

// deletes a task from our list
function deleteCheck(event) {

    const item = event.target;

    // delete the list item
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        // animate deletion
        todo.classList.add('deleted');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })

    }

    // click on checkmark to complete
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;

        todo.classList.toggle('completed');
    }


}

function filterTodo(event) {


    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.classList !== undefined) {
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "none";
                    } else {
                        todo.style.display = "flex";
                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });
}

// saves the current tasks to local storage
function saveLocalTodos(todo) {

    let todos = initTodos();

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

}



// ensures that tasks are kept even when page is refreshed
function getTodos() {

    let todos = initTodos();

    todos.forEach(function(todo) {
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create list of commands
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // check off completed tasks
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);
    })

}



// removes items from local storage
function removeLocalTodos(todo) {

    let todos = initTodos();

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}

// initializes list of todos
function initTodos() {
    let todos

    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    return todos
}