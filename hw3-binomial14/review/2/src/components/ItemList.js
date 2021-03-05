import React from "react";
import Item from "./Item"

export default ({ items, toggleCompleted, deleteItem, filterState }) =>
    <ul className="todo-app__list">
        {
            items.map((item, index) => (
                item.deleted === false && 
                (filterState === 0 || item.completed ===  (filterState === 2)) &&
                <Item
                    key={index}
                    task={item.task}
                    completed={item.completed}
                    toggleCompleted={toggleCompleted.bind(null, index)}
                    deleteItem={deleteItem.bind(null, index)}
                />
            ))
        }
    </ul>