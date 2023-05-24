// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const filterOptions = document.querySelector('#filter-options');
const dataTracker = document.querySelector('#data-tracker');
const clearAllButton = document.querySelector('#clear-all-button');

// Event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', updateTaskStatus);
taskList.addEventListener('click', deleteTask);
filterOptions.addEventListener('change', filterTasks);
clearAllButton.addEventListener('click', clearAllTasks);

// Function to add a task
function addTask(e) {
  e.preventDefault();

  const descriptionInput = document.querySelector('#description');
  const dueDateInput = document.querySelector('#due-date');

  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!description) {
    return;
  }

  const task = {
    id: Date.now().toString(),
    description,
    dueDate,
    completed: false
  };

  tasks.push(task);

  const taskItem = createTaskItem(task);
  taskList.appendChild(taskItem);

  descriptionInput.value = '';
  dueDateInput.value = '';

  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  updateLocalStorage();
  updateDataTracker(calculateLessonsPerWeek(tasks));
}

// Function to create a task item
function createTaskItem(task) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.dataset.id = task.id;
  taskItem.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''}>
    <span>${task.description}</span>
    <span>${formatDate(task.dueDate)}</span>
    <button class="delete-button">Delete</button>
  `;
  return taskItem;
}

// Function to update the status of a task
function updateTaskStatus(e) {
  if (e.target.matches('input[type="checkbox"]')) {
    const taskItem = e.target.parentElement;
    const taskId = taskItem.dataset.id;
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      task.completed = e.target.checked;
      taskItem.classList.toggle('completed', task.completed);
      updateLocalStorage();
      updateDataTracker(calculateLessonsPerWeek(tasks));
    }
  }
}

// Function to delete a task
function deleteTask(e) {
  if (e.target.classList.contains('delete-button')) {
    const taskItem = e.target.parentElement;
    const taskId = taskItem.dataset.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      taskItem.remove();
      updateLocalStorage();
      updateDataTracker(calculateLessonsPerWeek(tasks));
    }
  }
}

// Function to filter tasks
function filterTasks() {
  const selectedOption = filterOptions.value;
  const taskItems = taskList.querySelectorAll('.task-item');

  taskItems.forEach(taskItem => {
    const taskId = taskItem.dataset.id;
    const task = tasks.find(t => t.id === taskId);

    if (selectedOption === 'completed' && !task.completed) {
      taskItem.classList.add('hide');
    } else if (selectedOption === 'incomplete' && task.completed) {
      taskItem.classList.add('hide');
    } else {
      taskItem.classList.remove('hide');
    }
  });
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to format the date as "MM/DD/YYYY"
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}/${year}`;
}

// Function to update the data tracker
function updateDataTracker(lessonsPerWeek) {
  const dataTrackerElement = document.querySelector('#lessons-per-week');
  dataTrackerElement.textContent = lessonsPerWeek;
}

// Function to update the lessons completed per week
function calculateLessonsPerWeek(tasks) {
  const today = new Date();
  const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const lessonsCompletedThisWeek = tasks.reduce((count, task) => {
    const taskDate = new Date(task.dueDate);
    if (taskDate >= oneWeekAgo && taskDate <= today && task.completed) {
      return count + 1;
    }
    return count;
  }, 0);
  return lessonsCompletedThisWeek;
}

// Function to clear all tasks and local storage
function clearAllTasks() {
  tasks = [];
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
  updateDataTracker(0);
}

// Initial setup on page load
function initialize() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });

  updateDataTracker(calculateLessonsPerWeek(tasks));
}

initialize();
