let url_list = [
	"https://mjohnsphoto.files.wordpress.com/2014/11/img_6861_1920.jpg",
	"https://mjohnsphoto.files.wordpress.com/2014/11/img_2465_1920.jpg",
	"https://i.imgur.com/ltrnMib.jpg",
	"https://mjohnsphoto.files.wordpress.com/2014/12/img_6525_1920.jpg",
	"https://i.imgur.com/JsoCozp.jpg",
	"https://i1.wp.com/static.cnbetacdn.com/article/2020/0219/94e459ad929c6a7.jpg?ssl=1",
	"https://images.ctfassets.net/usf1vwtuqyxm/7jtm2fvxWBptLdLIWAAGg0/91912351116a6d5924864422d3aff6a2/UOR_HogwartsLights_Hogsmeade.jpg",
	"https://img.pc841.com/2018/0730/20180730081702510.jpg",
	"https://i2.gqxz.com/uploads/ueditor/image/20200421/1587483979518070.jpg",
]
var current_idx = 0

// 先獲取所有所需的 element variable
let prev_button = document.getElementById("previous");
let next_button = document.getElementById("next");
let display = document.getElementById("display");
let link = document.getElementById("source");

// helper function
function update_display() {
	display.src = "";
	display.src = url_list[current_idx];
	link.href = url_list[current_idx];
	link.innerHTML = url_list[current_idx];
}
function change_button_style(button, cmd) {
	if(cmd === "remove")
		button.removeAttribute("style");
	else button.setAttribute("style", "filter: grayscale(100%);");
}

// event listener
prev_button.addEventListener(
	"click",
	function() {
		if(current_idx > 0){ 
			if(current_idx == url_list.length-1)
				change_button_style(next_button, "remove");
			--current_idx;
			if(current_idx == 0)
				change_button_style(prev_button, "set");
		}
		update_display();
	}
);
next_button.addEventListener(
	"click",
	function() {
		if(current_idx < url_list.length-1){
			if(current_idx == 0)
				change_button_style(prev_button, "remove");
			++current_idx;
			if(current_idx == url_list.length-1)
				change_button_style(next_button, "set");
		}
		update_display();
	}
);

// init
change_button_style(prev_button, "set");
if(url_list.length == 1)
	change_button_style(next_button, "set");
update_display();


