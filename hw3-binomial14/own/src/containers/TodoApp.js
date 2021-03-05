import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import List from "../components/List";
//import Item from "../components/Item";
import Footer from "../components/Footer";
import x from '../img/x.png'

var display_status = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2
};

var item_status = {
  ACTIVE: 1,
  COMPLETED: 2,
  CLEARED: 3
};

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input type='checkbox'
            id={this.props.id}
            onClick={c => {this.props.changeStatus(this.props.id, this.props.detail)}}>  
          </input>
          <label htmlFor={this.props.id} style={this.props.labelStyle}></label>
        </div>
        <h1 className="todo-app__item-detail" style={this.props.detailStyle}>{this.props.detail}</h1>
        <img className="todo-app__item-x" src={x}
            alt = "qqq"
            onClick={c => {this.props.clearItem(this.props.id, this.props.detail)}}/>

      </li>
    );
  }
}

class TodoApp extends Component {
  constructor(props) { 
      super(props);
      this.state = {
        count: 0,
        Status: display_status.ALL,
        show_list: [], // initialize
        all_list: []
      }
    }
    display = (display_Status) => {
      //console.log("display");
      console.log(display_Status);
      var display_list = [];
      //for(var i = 0; i < this.state.all_list.filter(i => i.status != Status))
      if(display_Status === display_status.ALL)
      {
        for(var i = 0; i < this.state.all_list.filter(item => item.status !== item_status.CLEARED).length; i++)
        {
          display_list.push(this.state.all_list.filter(item => item.status !== item_status.CLEARED)[i].node);
        }
      }
      else
      {
        for(var j = 0; j < this.state.all_list.filter(item => item.status !== item_status.CLEARED).filter(item => item.status === display_Status).length; j++)
        {
          display_list.push(this.state.all_list.filter(item => item.status !== item_status.CLEARED).filter(item => item.status === display_Status)[j].node);
        }
      }
      this.setState({Status: display_Status});
      this.setState({show_list: display_list});
      this.setState({count: this.state.all_list.filter(item => item.status !== item_status.CLEARED).filter(item => item.status !== item_status.COMPLETED).length});
    }

    change_status = (id, d) => {
      console.log("change status");
      //console.log(id);
      //console.log(d);
      //console.log(this.state.all_list);
      var list = this.state.all_list;
      if(list[id].status === item_status.ACTIVE)
      {
        console.log("change");
        list[id].status = item_status.COMPLETED;
        list[id].node = <Item id={id}
          labelStyle={
            {
              background: '#26ca299b'
            }
          }
          detailStyle={
            {
              textDecoration: 'line-through',
              opacity: 0.5
            }
          }
          detail={d}
          changeStatus={this.change_status}
          clearItem={this.clear_item}
          key={id}
        />;
      }
      else
      {
        list[id].status = item_status.ACTIVE;
        list[id].node = <Item id={id}
          labelStyle={
            {
              background: 'rgba(99, 99, 99, 0.698)'
            }
          }
          detailStyle={
            {
              textDecoration: 'none',
              opacity: 1
            }
          }
          detail={d}
          changeStatus={this.change_status}
          clearItem={this.clear_item}
          key={id}
        />;
      }
      this.setState({all_list: list});
      this.display(this.state.Status);
    }

    clear_item = (id, d) => {
      console.log("clear item");
      var list = this.state.all_list;
      list[id].status = item_status.CLEARED;
      this.setState({all_list: list});
      this.display(this.state.Status);
    }

    show_All = () => {
      //console.log("ALL");
      this.display(display_status.ALL);
    }
    show_Active = () => {
      //console.log("ACTIVE");
      this.display(display_status.ACTIVE);
    }
    show_Complete = () => {
      //console.log("COMPLETE");
      this.display(display_status.COMPLETED);
    }
    clear = () => {
      //this.setState({ count : 0});
      //this.update(this.state.count);
      var list = this.state.all_list;
      for(var i = 0; i < list.length; i++)
      {
        if(list[i].status === item_status.COMPLETED)
        {
          list[i].status = item_status.CLEARED;
        }
      }
      this.setState({all_list: list});
      this.display(this.state.Status);
    }

    keypress = k => {
      console.log("key pressed");
      if(k.key === "Enter")
      {
        //console.log(k.target.value)
        var todo = k.target.value;
        var total_list = this.state.all_list;
        var new_item=
        {
          status: item_status.ACTIVE,
          detail: todo,
          id: this.state.all_list.length,
          node: <Item id={this.state.all_list.length}
            labelStyle={
              {
                background: 'rgba(99, 99, 99, 0.698)'
              }
            }
            detailStyle={
              {
                textDecoration: 'none',
                opacity: 1
              }
            }
            detail={todo}
            changeStatus={this.change_status}
            clearItem={this.clear_item}
            key={this.state.all_list.length}
          />
          
        };
        total_list.push(new_item);
        k.target.value = "";
        this.setState({all_list: total_list});
        this.display(this.state.Status);
        //console.log(this.state.all_list);
      }

    }
    render() {
    //console.log(this.state.all_list);
    return (
      <>
            <Header text="todos" />
            <Input keypress={k => this.keypress(k)}/>
            <List items={this.state.show_list}/>
            <Footer count={this.state.count} ALL={this.show_All} ACTIVE={this.show_Active} COMPLETE={this.show_Complete} CLEAR={this.clear}></Footer>
      </>
        );
    }
}

export default TodoApp;
