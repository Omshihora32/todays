const todo_list = document.querySelector(".todo-list");
const task_name = document.querySelector("#task_name");
const Add_Task = document.querySelector("#Add_Task");
let tasks = [];
let dict = {};
let keys = ["id", "title"];

function saveToLocal(tasks) {
    return localStorage.setItem("task", JSON.stringify(tasks));
}

function displayAllStoredTask() {
    console.log(localStorage.getItem("task"));
    let old_task = JSON.parse(localStorage.getItem("task"));
    if (old_task === null) {
        tasks = [];
        return;
    }
    for (let i = 0; i < old_task.length; i++) {
        CreateList(old_task[i].title);
    }
}

displayAllStoredTask();


function deleteFromLocal(text) {
    let local = JSON.parse(localStorage.getItem("task"));
    let item = local.find(obj => obj.title === text);
    console.log(item);
    let id = item ? item.id : null;
    console.log(id);
    // console.log(local);
    // local.splice(index , 1);
    // saveToLocal(local);
    // todo_list.innerHTML = "";
    // displayAllStoredTask();
}

function CreateList(text) {
    // create li
    const li = document.createElement("li");

    // create span
    const span = document.createElement("span");
    span.innerText = text;

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✕";
    deleteBtn.classList.add("delete");

    deleteBtn.addEventListener("click", function () {
        
        deleteFromLocal(span.innerHTML);
    });

    // append span and button to li
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // finally append li to ul
    document.querySelector(".todo-list").appendChild(li);
}

Add_Task.addEventListener("click", function () {
    if (task_name.value === "") {
        alert("Please first enter the task name.");
        return;
    }
    tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks !== null) {
        dict[keys[0]] = Date.now();
        dict[keys[1]] = task_name.value;
        tasks.push(dict);
        console.log(tasks);
        saveToLocal(tasks);
        CreateList(dict[keys[1]]);
        task_name.value = "";
    }
    else {
        localStorage.setItem("task", JSON.stringify([`${dict}`]));
    }
});