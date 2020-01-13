var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

var clearButton = document.getElementById("clear-completed-button");
clearButton.addEventListener("click", clearCompletedItems);

var emptyListButton = document.getElementById("empty-button");
emptyListButton.addEventListener("click", emptyList);

var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

var entryBox = document.getElementById("entry-box");
var toDoList = document.getElementById("todo-list");

function toggleItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
        
    }
}

function newItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleItemState);
}

function addItem() {
    var itemText = entryBox.value;
    newItem(itemText, false);
}

function clearCompletedItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

function saveList() {
    var toDos = [];
    document.getElementById("saved").innerHTML = "Saved";

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newItem(toDo.task, toDo.completed);
        }
    }
}

loadList();