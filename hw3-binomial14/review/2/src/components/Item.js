import React from "react";
import xPng from "../img/x.png"

export default ({ task, completed, toggleCompleted, deleteItem }) =>
    <li className={"todo-app__item " + (completed ? "completed" : "")}>
        <div className="todo-app__checkbox">
            <label onClick={toggleCompleted} />
        </div>
        <h1 className="todo-app__item-detail">{task}</h1>
        <img src={xPng} className="todo-app__item-x" onClick={deleteItem} alt="" />
    </li>