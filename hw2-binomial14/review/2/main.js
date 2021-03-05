//var li = document.createElement("li");
var newTaskInput = document.querySelector(".todo-app__input");
var TODO_ul = document.querySelector(".todo-app__list");

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { EnterKeydown(); }
});

var Tasks = document.querySelectorAll(".todo-app__item");
var tasksCount = 0;
function EnterKeydown() {
    console.log(newTaskInput.value);
    // console.log("tasks", tasks);
    // console.log("tasks", tasks.length);
    createNewTask();
    upDateCount();

};

function delete_task(it) {
    console.log("DELETE"); console.log(it);
    TODO_ul.removeChild(it.parentNode);
    upDateCount();
}
function upDateCount() {
    Tasks = document.querySelectorAll(".todo-app__item");
    var TODO_li = Array.apply(null, Tasks);
    console.log(TODO_li.filter(ele => !ele.classList.contains('done')).length);
    document.querySelector(".todo-app__total").innerHTML = TODO_li.filter(ele => !ele.classList.contains('done')).length + " left";
}

function check_task(it) {
    console.log("CHECK");
    var item = it.parentNode.parentNode;
    var textDiv = it.parentNode.parentNode.childNodes[1];
    var text = textDiv.childNodes[0];
    if (it.checked) {
        item.classList.add('done');
        textDiv.classList.add('lineThrough');
    }
    else {
        item.classList.remove('done');
        textDiv.classList.remove('lineThrough');
    } 
    upDateCount();
}

document.querySelector("#all_button").addEventListener("click", function(e) {
    console.log("ALL")
    Tasks = document.querySelectorAll(".todo-app__item");
    var TODO_li = Array.apply(null, Tasks);
    for (var i=0; i<TODO_li.length; i++) {
        if (TODO_li[i].classList.contains('done')) {
            console.log(Tasks[i]);
            Tasks[i].classList.remove('hide');
        }
    }
    
});
document.querySelector("#active_button").addEventListener("click", function(e) {
    Tasks = document.querySelectorAll(".todo-app__item");
    var TODO_li = Array.apply(null, Tasks);
    for (var i=0; i<TODO_li.length; i++) {
        if (TODO_li[i].classList.contains('done')) {
            console.log(Tasks[i]);
            Tasks[i].classList.add('hide');
        } else {
            Tasks[i].classList.remove('hide');
        }
    }
});
document.querySelector("#complete_button").addEventListener("click", function(e) {
    Tasks = document.querySelectorAll(".todo-app__item");
    var TODO_li = Array.apply(null, Tasks);
    for (var i=0; i<TODO_li.length; i++) {
        if (TODO_li[i].classList.contains('done')) {
            console.log(Tasks[i]);
            Tasks[i].classList.remove('hide');
        } else {
            Tasks[i].classList.add('hide');
        }
    }
});
document.querySelector("#clear_button").addEventListener("click", function(e) {
    TODO_ul.innerHTML = '';
    Tasks = document.querySelectorAll(".todo-app__item");
    upDateCount();
});


function createNode(node, attributes){
    const el = document.createElement(node);
    for(let key in attributes){
        el.setAttribute(key, attributes[key]);
    }
    return el;
}

function createNewTask() {
    console.log("CREATE");
    tasksCount++;
    const item = createNode("li", {
        class: "todo-app__item",
        // id: `item__${tasks.length-1}`
    });

    const checkbox = createNode("div", {class: "todo-app__checkbox"});
    const checkbox_label = createNode("label", {for: `checkbox_${tasksCount}`});
    const checkbox_input = createNode('input',{
        id: `checkbox_${tasksCount}`,
        type: "checkbox",
        onclick: "check_task(this)"
    });

    const item_detailDiv = document.createElement("div");
    const item_detail = document.createElement("h1");
    item_detail.innerHTML = newTaskInput.value;

    const x_img = createNode('img', {
        src: "./img/x.png",
        class: "todo-app__item-x",
        onclick: "delete_task(this)"
    });

    checkbox.appendChild(checkbox_input);
    checkbox.appendChild(checkbox_label);
    item.appendChild(checkbox);
    item_detailDiv.appendChild(item_detail);
    item.appendChild(item_detailDiv);
    item.appendChild(x_img);
    
    TODO_ul.appendChild(item);
};