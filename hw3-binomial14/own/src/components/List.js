import React from "react";
export default ({ items }) => {
    //    const {text} = props // expected to be { text: "" }
    return (
      <ul className="todo-app__list" id="todo_list">{items}</ul>
    );
};