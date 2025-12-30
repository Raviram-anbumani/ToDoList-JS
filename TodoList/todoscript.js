var pop = document.getElementById("popup");
var overlay = document.querySelector(".overlay");
var inputpopup = document.querySelector(".inputpopup");
var loginpopup = document.querySelector(".signup");

pop.addEventListener("click", function () {
  overlay.style.display = "block";
  inputpopup.style.display = "block";
});

var addTask = document.getElementById("addTask");
var cancel = document.getElementById("cancel");

function loadData() {
  const taskArray = JSON.parse(localStorage.getItem("StoredTasks")) || [];
  const userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];

  var noTask = document.getElementById("noTask");
  var noCompletedTask = document.getElementById("noCompletedTask");
  var container = document.querySelector(".container");
  var completed = document.querySelector(".completed");
  if (container.querySelector(".task")) container.innerHTML = "";
  if (completed.querySelector(".task")) completed.innerHTML = "";

  userList.forEach((user) => {
    if (user.checked) {
      document.getElementById("userTitle").innerHTML = `Hello, ${user.name}🧑‍💻`;

      taskArray.forEach((taskItem, index) => {
        if (taskItem.username == user.name) {
          var task = document.createElement("div");
          task.setAttribute("class", "task");
          if (!taskItem.completed) {
            task.innerHTML = `<h4>Task  - ${taskItem.name}</h4><p><strong>💼Task Category : </strong>${taskItem.category}</p><p><strong>⏰Due :</strong> ${taskItem.taskDate} at ${taskItem.taskerTime}</p><button onclick="deleteTask(${index})">Task Completed</button>`;
            if (taskItem.overdue) {
              task.style.backgroundColor = "#ff0000ff";
              task.insertAdjacentHTML("beforeend", "⏰");
            } else if (taskItem.priority == "high") {
              task.style.backgroundColor = "#7a1f1f";
              task.insertAdjacentHTML("beforeend", "<span>🚨</span>");
            } else if (taskItem.priority == "medium") {
              task.style.backgroundColor = "#7a6a1f";
              task.insertAdjacentHTML("beforeend", "⏳");
            } else {
              task.insertAdjacentHTML("beforeend", "🌿");
            }
            container.append(task);
          } else {
            task.style.backgroundColor = "rgba(24, 205, 24, 1)";
            task.innerHTML = `<h4>Task - ${taskItem.name}</h4><p><strong>💼Task Category : </strong>${taskItem.category}</p><p><strong>⏰Due :</strong> ${taskItem.taskDate} at ${taskItem.taskerTime}</p><p><strong>✔️Completed By :</strong> ${taskItem.completedTime}</p>`;
            if (taskItem.overdue)
              task.insertAdjacentHTML("beforeend", "⏰Late Completion");
            completed.append(task);
          }
        }
      });

      if (
        (container.querySelector(".task") ||
          completed.querySelector(".task")) &&
        document.getElementById("noTask")
      )
        noTask.remove();
      if (
        !container.querySelector(".task") &&
        completed.querySelector(".task")
      ) {
        if (!emptyTask) {
          var emptyTask = document.createElement("p");
          emptyTask.setAttribute("id", "completedTask");
          emptyTask.innerHTML = "🎉All tasks has been completed";
          container.append(emptyTask);
        }
      }
      if (
        completed.querySelector(".task") &&
        document.getElementById("noCompletedTask")
      )
        noCompletedTask.remove();
    }
  });
}
loadData();

addTask.addEventListener("click", function () {
  var inputTask = document.getElementById("inputTask").value;
  var taskCategory = document.getElementById("taskCategory").value;
  var taskTime = document.getElementById("taskTime").value;
  var inputDescription = document.getElementById("inputDescription").value;
  var priorityColor = document.querySelector(
    'input[name="Priority"]:checked'
  ).value;

  const userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];
  for (let user of userList) {
    if (user.checked) {
      if (document.getElementById("noTask")) noTask.remove();
      if (document.getElementById("completedTask"))
        document.getElementById("completedTask").remove();
      var task = document.createElement("div");
      task.setAttribute("class", "task");
      if (inputTask.value == "" || inputDescription.value == "") {
        alert("Add your task with required fields.");
      } else {
        const taskAdded = {
          name: inputTask,
          category: taskCategory,
          taskDate: inputDescription,
          taskerTime: taskTime,
          completed: false,
          priority: priorityColor,
          username: user.name,
        };
        const taskArray = JSON.parse(localStorage.getItem("StoredTasks")) || [];
        taskArray.push(taskAdded);
        localStorage.setItem("StoredTasks", JSON.stringify(taskArray));
        overlay.style.display = "none";
        inputpopup.style.display = "none";
      }
      loadData();
      return;
    }
  }
  alert("Login to add and manage your tasks.");
});

function deleteTask(index) {
  const taskArray = JSON.parse(localStorage.getItem("StoredTasks")) || [];
  alert("Congratulations 🏆!! , You have completed your task successfully.");
  taskArray[index].completed = true;
  taskArray[index].completedTime = new Date();
  localStorage.setItem("StoredTasks", JSON.stringify(taskArray));
  loadData();
}

cancel.addEventListener("click", function (event) {
  event.preventDefault();
  overlay.style.display = "none";
  inputpopup.style.display = "none";
});

document.getElementById("login").addEventListener("click", () => {
  loginpopup.style.display = "block";
  overlay.style.display = "block";
});

document.getElementById("logCancel").addEventListener("click", (event) => {
  event.preventDefault();
  overlay.style.display = "none";
  loginpopup.style.display = "none";
});

document.getElementById("addUser").addEventListener("click", (event) => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let userOcc = document.getElementById("userOcc").value;
  if (username == "" || userOcc == "") {
    alert("Please enter the user details correctly.");
    return;
  }
  const userData = { name: username, occ: userOcc };
  const userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];
  userList.push(userData);
  localStorage.setItem("UserCredentials", JSON.stringify(userList));
  alert("Signed up successfully!! You are now ready for your Tasks!");
});

document.getElementById("loginCheck").addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let userOcc = document.getElementById("userOcc").value;
  if (username == "" || userOcc == "") {
    alert("Please enter the user details correctly.");
    return;
  }
  const userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];
  for (let user of userList) {
    if (username == user.name && userOcc == user.occ) {
      user.checked = true;
      localStorage.setItem("UserCredentials", JSON.stringify(userList));
      alert("Welcome back! You logged in successfully");
      document.getElementById("login").style.display = "none";
      overlay.style.display = "none";
      loginpopup.style.display = "none";
      loadData();
      return;
    }
  }
  alert("You don't have an account! Create one now..");
});

document.getElementById("logoutNav").addEventListener("click", () => {
  const userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];
  for (let user of userList) {
    if (user.checked) {
      user.checked = false;
      localStorage.setItem("UserCredentials", JSON.stringify(userList));
      alert("You have been logged out successfully.");
      document.getElementById("login").style.display = "block";
      return;
    }
  }
  alert("You are not logged in");
});

function checkOverdue() {
  let taskArray = JSON.parse(localStorage.getItem("StoredTasks")) || [];
  let userList = JSON.parse(localStorage.getItem("UserCredentials")) || [];

  for (let user of userList) {
    if (user.checked) {
      taskArray.forEach((task) => {
        if (user.name == task.username && !task.completed) {
          let due = new Date(task.taskDate + "T" + task.taskerTime);
          let now = new Date();
          if (now > due && !task.overdue) {
            task.overdue = true;
            localStorage.setItem("StoredTasks", JSON.stringify(taskArray));
            loadData();
          }
        }
      });
    }
  }
}
setInterval(checkOverdue, 1000);
/*
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
*/

/*
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
  }*/
/*
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
setInterval(checkOverdue, 1000)*/
