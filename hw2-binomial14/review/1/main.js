// data
var item_list = { list : [], mode : 'all' };
var item_index = 0;

window.onload = function()
{
    // const input = document.getElementById('todo-input');
    // const display_item_list = document.getElementById('todo-list');
    // const show_all = document.getElementById('todo-show_all');
    // const show_active = document.getElementById('todo-show_active');
    // const show_completed = document.getElementById('todo-show_completed');
    
    function refreshDisplayList()
    {
        document.getElementById('todo-list').innerHTML = '';
        for (let index = 0; index < item_list.list.length; index++) {
            const tempItem = item_list.list[index];
            if (
                (item_list.mode === 'all' ||
                (item_list.mode === 'active' && !tempItem.completed) ||
                (item_list.mode === 'completed' && tempItem.completed)))
            {
                document.getElementById('todo-list').appendChild(tempItem);
            }
        }
        document.getElementById('todo-total').innerText = String(item_list.list.length) + ' left';
    }
    
    document.getElementById('todo-input').placeholder = "Do something for your life...";
    document.getElementById('todo-input').addEventListener('keyup', event =>{
        if (event.key === "Enter" && event.target.value !== '')
        {
            item_list.list.push(createDisplayItem(event.target.value));
            document.getElementById('todo-input').value = '';
            refreshDisplayList();
        }
    });

    document.getElementById('todo-show_all').onclick = function()
    {
        item_list.mode = 'all';
        refreshDisplayList();
    }

    document.getElementById('todo-show_active').onclick = function()
    {
        item_list.mode = 'active';
        refreshDisplayList();
    }

    document.getElementById('todo-show_completed').onclick = function()
    {
        item_list.mode = 'completed';
        refreshDisplayList();
    }

    document.getElementById('todo-clean').onclick = function()
    {
        for (let index = 0; index < item_list.list.length; index++) {
            const temp_item = item_list.list[index];
            if (temp_item.completed)
            {
                item_list.list.splice(index, 1);
                index--;
            }
        }
        refreshDisplayList();
    }
    // hi
    function createDisplayItem(input_string)
    {
        var new_dis_item = document.createElement('li');
        var checkbox = document.createElement('div');
        var detail = document.createElement('h1');
        var x_img = document.createElement('img');
        var input = document.createElement('input');
        var label = document.createElement('label');
        
        new_dis_item.className = "todo-app__item";
        checkbox.className = "todo-app__checkbox";
        detail.className = "todo-app__item-detail";
        detail.innerText = input_string;
        x_img.src = "./img/x.png";
        x_img.className = "todo-app__item-x";
        input.id = item_index;
        input.type = 'checkbox';
        label.htmlFor = item_index;
        item_index++;

        input.onclick = function()
        {
            new_dis_item.completed = input.checked;
            if (input.checked)
            {
                detail.style["textDecoration"] = "line-through";
                detail.style["opacity"] = 0.5;
            }
            else
            {
                detail.style["textDecoration"] = "none";
                detail.style["opacity"] = 1.0;
            }
            refreshDisplayList();
        }

        x_img.onclick = function()
        {
            var index = item_list.list.indexOf(new_dis_item);
            item_list.list.splice(index, 1); 
            refreshDisplayList();
        }
    
        checkbox.appendChild(input);
        checkbox.appendChild(label);
        new_dis_item.appendChild(checkbox);
        new_dis_item.appendChild(detail);
        new_dis_item.appendChild(x_img);

        new_dis_item.completed = false;

        return new_dis_item;
    }
    
    // function Item(input_string)
    // {
    //     // this.displayItem = createDisplayItem(input_string, item_index);
    //     this.completed = false;
    //     item_index++;
    // }
}


