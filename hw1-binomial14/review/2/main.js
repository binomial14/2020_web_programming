var images = [
    "https://i.imgur.com/UZhPHrC.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHRp8a-lVnjeSr6vV9ZCk-nNeySZA0jBOe9A&usqp=CAU",
    "https://i2.wp.com/www.tripresso.com/blog/wp-content/uploads/2018/06/%E7%A6%AE%E8%B2%8C%E6%A2%97%E5%9C%96.jpg?resize=768%2C432&ssl=1"
];
var imageItem = document.getElementById("display");
var preButton = document.getElementById("previous");
var nexButton = document.getElementById("next");
var displayItem = document.getElementById("display");
var displaySource = document.getElementById("display-source-url");
var state = 0;

const preImg = () => {
    if (state === 2) {
        nexButton.classList.remove("disabled");
    }
    if (state !== 0) {
        state--;
        displayItem.src = images[state];
        displaySource.href = images[state];
        displaySource.innerHTML = images[state];
        if (state === 0) {
            preButton.classList.add("disabled");
        }
    }
}

const nextImg = () => {
    if (state === 0) {
        preButton.classList.remove("disabled");
    }
    if (state !== 2) {
        state++;
        displayItem.src = images[state];
        displaySource.href = images[state];
        displaySource.innerHTML = images[state];
        if (state === 2) {
            nexButton.classList.add("disabled");
        }
    }
}

const preloadingEffect = () => {
    if (state !== 0) {
        displayItem.src = "./images/loading.gif";
    }
}

const nextloadingEffect = () => {
    if (state !== 2) {
        displayItem.src = "./images/loading.gif";
    }
}