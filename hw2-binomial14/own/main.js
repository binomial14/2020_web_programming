var item_list = [];

var item_status = {
  TODO: 0,
  COMPLETED: 1,
  CLEARED: 2,
};
var show_status = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
}
var show_state = show_status.ALL;

const input = document.getElementsByClassName("todo-app__input")[0];
input.addEventListener("keyup", event => {
  // console.log(event.keyCode)
  if (event.keyCode === 13 && event.target.value !== "") {
    
    add_item(event.target.value);
    update();
    event.target.value = "";
  }
});


function update() { 
  all_list = document.getElementById("todo-list");
  
  while (all_list.childNodes.length != 0) { 
    all_list.removeChild(all_list.childNodes[0])
  }
  var left_count = 0;
  switch(show_state){
    case show_status.ALL:
      for (var i = 0; i < item_list.length; ++i) {
        if (item_list[i].status === item_status.TODO || item_list[i].status === item_status.COMPLETED) { 
          all_list.appendChild(item_list[i].node);
        }
        if (item_list[i].status === item_status.TODO) { 
          left_count++;
        }
      }
      break;
    case show_status.ACTIVE:
      for (var i = 0; i < item_list.length; ++i) { 
        if (item_list[i].status === item_status.TODO) { 
          all_list.appendChild(item_list[i].node);
        }
        if (item_list[i].status === item_status.TODO) { 
          left_count++;
        }
      }
      break;
    case show_status.COMPLETED:
      for (var i = 0; i < item_list.length; ++i) { 
        if (item_list[i].status === item_status.COMPLETED) { 
          all_list.appendChild(item_list[i].node);
        }
        if (item_list[i].status === item_status.TODO) { 
          left_count++;
        }
      }
      break;
    case show_status.CLEARED:
      for (var i = 0; i < item_list.length; ++i) { 
        if (item_list[i].status === item_status.CLEARED) { 
          all_list.appendChild(item_list[i].node);
          document.getElementById(i).parentNode.childNodes[1].style["background"] = "rgba(99, 50, 50, 0.698)";
          document.getElementById(i).parentNode.parentNode.childNodes[1].style["textDecoration"] = "none";
          document.getElementById(i).parentNode.parentNode.childNodes[1].style["opacity"] = "0.5";
        }
        if (item_list[i].status === item_status.TODO) { 
          left_count++;
        }
      }
      
//      break;
//    default:
//      break;
  }
  // const showing_list = document.getElementById("todo-list").childNodes;
  // for (var i = 0; i < showing_list.length; ++i) {
  //   // console.log(showing_list[i])
    
  // }

  document.getElementsByClassName("todo-app__total")[0].innerText = left_count + " left";
}

function add_item(detail_text) { 
  var item = {};
  const itemnode = document.createElement("LI");
  const wrapper = document.createElement("DIV");
  const checkbox_label = document.createElement("LABEL");
  const checkbox_input = document.createElement("INPUT");
  const detail = document.createElement("H1");
  const deletelist = document.createElement("IMG");

  itemnode.classList.add("todo-app__item");
  wrapper.classList.add("todo-app__checkbox");
  detail.classList.add("todo-app__item-detail");
  deletelist.classList.add("todo-app__item-x");

  checkbox_input.setAttribute("id",String(item_list.length));
  checkbox_input.setAttribute("type" , "checkbox");
  checkbox_input.setAttribute("onclick","complete(this.id)")
  checkbox_label.setAttribute("for",String(item_list.length));
  deletelist.setAttribute("onclick","delete_item(this.parentNode.childNodes[0].childNodes[0].id)");
  deletelist.src = "img/x.png";
  
  detail.innerText = detail_text;
  
  wrapper.appendChild(checkbox_input);
  wrapper.appendChild(checkbox_label);
  itemnode.appendChild(wrapper);
  itemnode.appendChild(detail);
  itemnode.appendChild(deletelist);
  
  item.node = itemnode;
  item.status = item_status.TODO;
  item_list.push(item);
}

function complete(id) {
  if (item_list[id].status !== item_status.CLEARED) {
    if (item_list[id].status === item_status.TODO) {
      item_list[id].status = item_status.COMPLETED;
      
      node = document.getElementById(id).parentNode.parentNode.childNodes[1];
      node.style["textDecoration"] = "line-through";
      node.style["opacity"] = 0.5;
      document.getElementById(id).parentNode.childNodes[1].style["background"] = "#26ca299b";
      update();
    } else if (item_list[id].status === item_status.COMPLETED) {
      item_list[id].status = item_status.TODO;
      
      node = document.getElementById(id).parentNode.parentNode.childNodes[1];
      node.style["textDecoration"] = "none";
      node.style["opacity"] = 1;
      document.getElementById(id).parentNode.childNodes[1].style["background"] = "rgba(99, 99, 99, 0.698)";
      update();
    }
  } else { 
    document.getElementById(id).parentNode.childNodes[1].style["background"] = "rgba(99, 50, 50, 0.698)";
  }
}

function show_All() { 
  show_state = show_status.ALL;
  update();
}

function show_Active() { 
  show_state = show_status.ACTIVE;
  update();
}

function show_Completed() { 
  show_state = show_status.COMPLETED;
  update();
}

function delete_item(id) { 
  item_list[id].status = item_status.CLEARED;
  update();  
}

function clear_complete() { 
  for (var i = 0; i < item_list.length; ++i) { 
    if (item_list[i].status === item_status.COMPLETED) { 
      item_list[i].status = item_status.CLEARED;
    }
  }
  update();  
}