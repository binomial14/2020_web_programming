import React from "react";

export default class ItemInput extends React.Component {
    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value === "") return;
            this.props.addNewItem(event.target.value);
            event.target.value = "";
        }
    }
    render() {
        return (
            <input
                className="todo-app__input"
                onKeyDown={this.onKeyDown}
                placeholder="What needs to be done?"
            />
        )
    }
}