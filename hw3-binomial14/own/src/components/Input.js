import React from "react";
export default ({ keypress }) => {
    //    const {text} = props // expected to be { text: "" }
    return (
        <input className="todo-app__input"
        placeholder="Write Down Something Todo"
        onKeyPress={keypress}
        />
    );
};
