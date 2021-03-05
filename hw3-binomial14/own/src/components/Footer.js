import React from "react";

//class Footer extends Component {
export default ({ count, ALL, ACTIVE, COMPLETE, CLEAR }) => {
 
    return (
      <footer className="todo-app__footer">
        <div className="todo-app__total">{count} left</div>
        <div className = "todo-app__view-buttons">
          <button type="button" onClick={ALL}>All</button>
          <button type="button" onClick={ACTIVE}>Active</button>
          <button type="button" onClick={COMPLETE}>Completed</button>
        </div>
        <div className = "todo-app__clean">
          <button type="button" onClick={CLEAR}>Clear Complete</button>
        </div>
      </footer>
    );
  
}