import React from "react";
export default ({ id, detail, changeItemStatus, clearItem}) => {
  /*constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      detail: this.props.detail
    }
  }*/

 
  return (
    <li className="todo-app__item">
      <div className="todo-app__checkbox">
        <input type='checkbox'
          id={id}
          onClick={changeItemStatus(id, detail)}>  
        </input>
        <label htmlFor={id}></label>
      </div>
      <h1 className="todo-app__item-detail" style={{textDecoration: 'none', opacity: 1}}>{detail}</h1>
      <img className="todo-app__item-x" src='./img/x.png'
          alt = "x"/>
    </li>
    );
  
}