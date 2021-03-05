import React from "react";

let ViewButton = ({ filterState, setFilterState, id, text }) =>
    <button
        className={filterState === id ? "active" : ""}
        onClick={setFilterState.bind(null, id)}
    >
        {text}
    </button>

export default ({ count, cleanCompleted, filterState, setFilterState }) =>
    <footer className="todo-app__footer">
        <div className="todo-app__total">{count} left</div>
        <ul className="todo-app__view-buttons">
            <ViewButton filterState={filterState} setFilterState={setFilterState} id={0} text="All" />
            <ViewButton filterState={filterState} setFilterState={setFilterState} id={1} text="Active" />
            <ViewButton filterState={filterState} setFilterState={setFilterState} id={2} text="Completed" />
        </ul>
        <div className="todo-app__clean">
            <button onClick={cleanCompleted}>Clean completed</button>
        </div>
    </footer>