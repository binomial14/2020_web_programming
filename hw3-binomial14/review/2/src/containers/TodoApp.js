import React, { Component } from "react";
import Header from "../components/Header";
import ItemList from "../components/ItemList"
import ItemInput from "../components/ItemInput"
import Footer from "../components/Footer"

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            count: 0,
            filterState: 0,
        };
    }
    addNewItem = (task) => this.setState(state => ({
        items: [...state.items, {
            task: task,
            completed: false,
            deleted: false,
        }]
    }))
    toggleCompleted = (index) => this.setState(state => {
        const newItems = [...state.items];
        const target = newItems[index];
        newItems[index] = {
            ...target,
            completed: !target.completed,
        }
        return { items: newItems };
    })
    deleteItem = (index) => this.setState(state => {
        const newItems = [...state.items];
        const target = newItems[index];
        newItems[index] = {
            ...target,
            deleted: true,
        }
        return { items: newItems };
    })
    cleanCompleted = () => this.setState(state => {
        const newItems = state.items.map(e => ({
            ...e,
            deleted: e.deleted || e.completed,
        }));
        return { items: newItems }
    })
    setFilterState = (newState) => this.setState({filterState: newState})
    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <ItemInput addNewItem={this.addNewItem} />
                    <ItemList
                        items={this.state.items}
                        toggleCompleted={this.toggleCompleted}
                        deleteItem={this.deleteItem}
                        filterState={this.state.filterState}
                    />
                </section>
                {
                    this.state.items.filter(e => !e.deleted).length > 0 &&
                    <Footer
                        count={this.state.items.filter(e => !e.completed && !e.deleted).length}
                        cleanCompleted={this.cleanCompleted}
                        filterState={this.state.filterState}
                        setFilterState={this.setFilterState}
                    />
                }
            </>
        );
    }
}

export default TodoApp;
