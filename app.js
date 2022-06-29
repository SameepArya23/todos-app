const form = document.getElementById("form");
const input = document.getElementById("input");
const getTask = JSON.parse(localStorage.getItem("task"));

form.addEventListener("submit", createList);

function createList(event) {
  event.preventDefault();
  const container = document.querySelector(".task-container");
  const tasks = document.createElement("li");
  tasks.classList.add("task-list");
  const hidden = document.createElement("div");
  hidden.classList.add("hide-title");

  const lists = `<input type="checkbox" />
  <label class="task-title"></label>
  <em class="task-status">incomplete</em>
  <img src="delete.svg" class="delete-btn" />`;
  tasks.innerHTML = lists;

  const label = tasks.querySelector(".task-title");
  const deleteBtn = tasks.querySelector(".delete-btn");
  const checkbox = tasks.querySelector("input");
  const taskStatus = tasks.querySelector(".task-status");

  const val = input.value;

  function updateStorage() {
    const task_label = document.querySelectorAll("label");
    const taskList = [];
    task_label.forEach((list) => {
      taskList.push({
        text: list.innerText,
        complete: list.classList.contains("checked-txt"),
      });
    });
    localStorage.setItem("task", JSON.stringify(taskList));
  }

  addInput(container, tasks, label, val, updateStorage);

  removeList(deleteBtn, tasks, container, label, hidden, updateStorage);

  taskCheck(checkbox, taskStatus, label, updateStorage);
}

function addInput(container, tasks, label, val, updateStorage) {
  if (val) {
    container.append(tasks);
    container.classList.add("show");
    label.innerHTML = val;
    input.value = "";
    updateStorage();
  } else {
    alert("Can't add invalid input!");
  }
}

function removeList(deleteBtn, tasks, container, label, hidden, updateStorage) {
  deleteBtn.addEventListener("click", () => {
    label.append(hidden);
    setTimeout(() => {
      tasks.remove();
      container.innerHTML === "" ? container.classList.remove("show") : "";
      updateStorage();
    }, 1000);
  });
}

function taskCheck(checkbox, taskStatus, label, updateStorage) {
  checkbox.addEventListener("click", () => {
    label.classList.toggle("checked-txt") === true
      ? (taskStatus.innerHTML = "complete")
      : (taskStatus.innerHTML = "incomplete");
    updateStorage();
  });
}
