imgs = ["https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2019/260x190/203076.png", "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612743/2019/260x190/1627750.png", "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2019/260x190/2544.png", "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612742/2019/260x190/1629029.png"];
var picture = document.getElementById("display");
var pre = document.getElementById("previous");
var nxt = document.getElementById("next");
var source = document.getElementById("source");

id = 0;
picture.src = imgs[id];
source.href = imgs[id];
pre.classList.add("disabled");

function back()
{
	if(id != 0)
	{
		console.log("back");
        id -= 1;
        if(id === 0)
        {
        	pre.classList.add("disabled");
        }
        if(id != imgs.length-1)
        {
        	nxt.classList.remove("disabled");
        }
        picture.src = "./images/loading.gif";
        picture.src = imgs[id];
		source.href = imgs[id];

	}
}

function next()
{
	if(id != imgs.length-1)
	{
		console.log("next");
        id += 1;
        if(id === imgs.length-1)
        {
        	nxt.classList.add("disabled");
        }
        if(id != 0)
        {
        	pre.classList.remove("disabled");
        }
        picture.src = "./images/loading.gif";
        picture.src = imgs[id];
		source.href = imgs[id];
	}
}
