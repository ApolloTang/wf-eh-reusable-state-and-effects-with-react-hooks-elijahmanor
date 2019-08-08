import React, { useState, useRef, useReducer } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";


export default function TodoList() {

  const [newTodo, updateNewTodo] = useState("");

  const todoId = useRef(0);

  const [todos, dispatch] = useReducer((state, action) => {

    switch (action.type) {
      case "ADD_TODO":
        todoId.current += 1;
        return [ ...state, { id: todoId.current, text: action.text, completed: false } ];
      case "DELETE_TODO":
        return state.filter(todo => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return state;
    }
  }, []);


  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    updateNewTodo("");
  };
  const handleNewChange = e => { updateNewTodo(e.target.value); }
  const handleDelete = (id) => { dispatch({ type: "DELETE_TODO", id }); };
  const handleCompletedToggle = (id) => { dispatch({ type: "TOGGLE_TODO", id }); };


  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={handleNewChange}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleCompletedToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
      <code><pre> {JSON.stringify(todos, null ,2)} </pre></code>
    </Container>
  );
}
