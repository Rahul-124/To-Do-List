// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");

// Display tasks on page load
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button onclick="toggleTask(${index})">✅</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  }
});

// Toggle completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Save to localStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render
renderTasks();