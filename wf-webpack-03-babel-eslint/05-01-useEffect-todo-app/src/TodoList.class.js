import React, { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";

const updateUnfinishedTodoCount = (_todos) =>  {
  const inCompleteTodos = _todos.reduce(
    (memo, todo) => (!todo.completed ? memo + 1 : memo),
    0
  );
  document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
}


export default class TodoList extends Component {

  initialTodos() {
    return JSON.parse(window.localStorage.getItem("todos") || "[]");
  }

  constructor(props) {
    super(props);

    this.state = {
      todos     : this.initialTodos(),
      newTodo   : "",
      showAbout : false
    };
  }

  handleKey = ({ key }) => {
    this.setState(
      prevState => ({
        showAbout:
          key === "?"
          ? true
          : key === "Escape" ? false : prevState.showAbout
      })
    );
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }



  update(_todos) {
    updateUnfinishedTodoCount(_todos)
    window.localStorage.setItem("todos", JSON.stringify(_todos));
  }

  componentDidUpdate(...args) {
    const prevState = args[1];
    if (prevState.todos !== this.state.todos) {
      this.update(this.state.todos);
    }
  }



  handleNewChange = e => { this.setState({ newTodo: e.target.value }) }

  handleNewSubmit = e => {
    e.preventDefault();
    this.setState(
      prevState => ({
        todos: [
          ...prevState.todos,
          { id: Date.now(), text: prevState.newTodo, completed: false }
        ],
        newTodo: ""
      })
    );
  }

  handleDelete = (id /* , e */) => {
    this.setState(
      prevState => ({ todos: prevState.todos.filter(todo => todo.id !== id) })
    )
  }

  handleCompletedToggle = (id /* , e */) => {
    this.setState(
      prevState => ({
        todos: prevState.todos.map( todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })
    );
  }


  render() {
    const { newTodo, todos, showAbout } = this.state;

    return (
      <Container todos={todos}>
        <NewTodo
          onSubmit={this.handleNewSubmit}
          value   ={newTodo}
          onChange={this.handleNewChange}
        />
        {!!todos.length && (
          <List>
            {todos.map(todo => (
              <TodoItem
                key     ={todo.id}
                todo    ={todo}
                onChange={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
        <About
          isOpen={showAbout}
          onClose={() => this.setState({ showAbout: false })}
        />
      </Container>
    );
  }
}
