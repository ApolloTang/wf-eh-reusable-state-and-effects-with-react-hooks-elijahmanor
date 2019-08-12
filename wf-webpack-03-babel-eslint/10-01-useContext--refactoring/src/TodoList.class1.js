/**
 * -----------------------------------
 * This component does not use reducer
 * -----------------------------------
 **/
import React, { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";
import ThemeContext from "./ThemeContext";

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

const calGreatestTodoId = (todos=[], startId=0) =>
  todos.reduce((acc, todo)=>Math.max(acc,todo.id), startId)

export default class TodoList extends Component {
  state = {
    todos: [],
    newTodo: "",
    showAbout: false
  }
  todoId = 0

  constructor(props) { super(props) }

  handleKey = ({ key }) => {
    this.setState(prevState => {
      return { showAbout: key === "?" ? true : key === "Escape" ? false : prevState.showAbout };
    });
  }


  updateTitleAndLocalStorage(todos) {
    const inCompleteTodos = incompleteTodoCount(todos)
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }


  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    document.addEventListener("keydown", this.handleKey);
    this.updateTitleAndLocalStorage(todos);
    this.setState({ todos });
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.updateTitleAndLocalStorage(this.state.todos);
    }
  }


  handleNewSubmit = e => {
    e.preventDefault();
    const prevId = calGreatestTodoId(this.state.todos, this.todoId) //@TODO only have to do this on reload
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { id: prevId+1, text: prevState.newTodo, completed: false }
        ],
        newTodo:''
      };
    });
  }
  handleNewChange = e => this.setState({ newTodo: e.target.value })
  handleDeleteTodo = id =>  {
    this.setState(prevState => {
      return { todos: prevState.todos.filter(todo => todo.id !== id) };
    });
  }
  handleToggleComplete = id =>  {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(
          todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    });
  }
  handleAboutClose = () => { this.setState({ showAbout: false }) }

  render() {
    const { newTodo, todos, showAbout } = this.state;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Container todos={todos}>
            <NewTodo
              onSubmit={this.handleNewSubmit}
              value={newTodo}
              onChange={this.handleNewChange}
            />
            {!!todos.length && (
              <List theme={theme}>
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onChange={this.handleToggleComplete}
                    onDelete={this.handleDeleteTodo}
                  />
                ))}
              </List>
            )}
            <About isOpen={showAbout} onClose={this.handleAboutClose} />
          </Container>
        )}
      </ThemeContext.Consumer>
    );
  }
}
