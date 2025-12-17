var count = 0;
var pop = document.getElementById("popup");
var overlay = document.querySelector(".overlay");
var inputpopup = document.querySelector(".inputpopup");

pop.addEventListener("click", function () {
  overlay.style.display = "block";
  inputpopup.style.display = "block";
});

var addTask = document.getElementById("addTask");
var cancel = document.getElementById("cancel");
var container = document.querySelector(".container");
var completed = document.querySelector(".completed");
var inputTask = document.getElementById("inputTask");
var taskCategory = document.getElementById("taskCategory");
var taskTime = document.getElementById("taskTime");
var inputDescription = document.getElementById("inputDescription");
var noTask = document.getElementById("noTask");
var noCompletedTask = document.getElementById("noCompletedTask");

addTask.addEventListener("click", function (event) {
  event.preventDefault();
  if (document.getElementById("noTask")) noTask.remove();
  if (document.getElementById("completedTask"))
    document.getElementById("completedTask").remove();
  var task = document.createElement("div");
  task.setAttribute("class", "task");
  if (inputTask.value == "" || inputDescription.value == "") {
    alert("Add your task with required fields.");
  } else {
    task.innerHTML = `<h4>Task ${++count} - ${
      inputTask.value
    }</h4><p><strong>Task Category : </strong>${
      taskCategory.value
    }</p><p><strong>Due :</strong> ${inputDescription.value} at ${
      taskTime.value
    }</p><button onclick="deleteTask(event)">Task Completed</button>`;
    container.append(task);
    var priority = document.querySelector('input[name="Priority"]:checked');
    overlay.style.display = "none";
    inputpopup.style.display = "none";
    task.dataset.duetime = taskTime.value;
    task.dataset.duedate = inputDescription.value;
    if (priority.value == "high") {
      task.style.backgroundColor = "#db611aff";
    } else if (priority.value == "medium") {
      task.style.backgroundColor = "#fb9b56ff";
    } else {
      task.style.backgroundColor = "#d8eb5aff";
    }
  }
});

function checkOverdue() {
  var tasks = document.querySelectorAll(".task");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].classList.contains("done")) continue;
    var due = new Date(
      tasks[i].dataset.duedate + "T" + tasks[i].dataset.duetime
    );
    var now = new Date();
    if (now > due && !tasks[i].classList.contains("overdue")) {
      tasks[i].style.backgroundColor = "#ff0000ff";
      tasks[i].classList.add("overdue");
      var overdue = document.createElement("p");
      overdue.innerHTML = "<strong>⚠️OVERDUE</strong>";
      tasks[i].append(overdue);
      alert("Task on overdue!!");
    }
  }
}
setInterval(checkOverdue, 1000);

function deleteTask(event) {
  event.target.parentElement.style.backgroundColor = "#00ff6aff";
  event.target.parentElement.classList.remove("overdue");
  event.target.parentElement.classList.add("done");
  let completedTime = new Date();
  var timeOfCompletion = document.createElement("p");
  timeOfCompletion.innerHTML = `<strong>Completed by : </strong>${completedTime}`;
  event.target.parentElement.append(timeOfCompletion);
  completed.append(event.target.parentElement);
  event.target.remove();
  alert("Congratulations 🏆!! , You have completed your task successfully.");
  if (document.getElementById("noCompletedTask")) noCompletedTask.remove();
  if (!container.querySelector(".task")) {
    var emptyTask = document.createElement("p");
    emptyTask.setAttribute("id", "completedTask");
    emptyTask.innerHTML = "🎉All tasks has been completed";
    container.append(emptyTask);
  }
}

cancel.addEventListener("click", function (event) {
  event.preventDefault();
  overlay.style.display = "none";
  inputpopup.style.display = "none";
});
