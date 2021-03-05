import React from "react";
export default ({ onClick, text }) => {
    //    const {text} = props // expected to be { text: "" }
    return (
        <button onClick={onClick}>{text}</button>
    );
};
