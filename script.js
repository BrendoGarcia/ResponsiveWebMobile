// scripts.js

document.getElementById('new-task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;
    const taskDate = document.getElementById('task-date').value;

    if (taskTitle && taskDate) {
        addTask(taskTitle, taskDesc, taskDate);
    }

    this.reset();
});

function addTask(title, desc, date) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
        <div>
            <h3>${title}</h3>
            <p>${desc}</p>
            <small>Data: ${date}</small>
        </div>
        <button onclick="toggleComplete(this)">✔️</button>
    `;

    taskList.appendChild(taskItem);
    saveTaskToLocalStorage(title, desc, date);
}

function toggleComplete(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
}

function saveTaskToLocalStorage(title, desc, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, desc, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.title, task.desc, task.date));
}

window.onload = loadTasksFromLocalStorage;
