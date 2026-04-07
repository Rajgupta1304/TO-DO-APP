document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addtaskbtn = document.getElementById("addtask-btn");
  const todolist = document.getElementById("todo-list");

  let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  Tasks.forEach((task) => renderTask(task));

  addtaskbtn.addEventListener("click", () => {
    const tasktext = todoinput.value.trim();
    if (tasktext === ""){
      alert("please enter your task...");
      return;
     };

    const newTask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };
    Tasks.push(newTask);
    savetask();
    renderTask(newTask);
    todoinput.Value = "";
   
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savetask();
    })

  li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();
    const id = li.getAttribute("data-id");
    Tasks = Tasks.filter(task => task.id != id);
    li.remove();
    savetask();
  })

    todolist.appendChild(li);
  }

  function savetask() {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }
});
