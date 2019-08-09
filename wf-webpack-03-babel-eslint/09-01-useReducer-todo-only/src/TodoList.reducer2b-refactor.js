import React, { useState, useRef, useReducer } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import hookReducerLogger from './hookReducerLogger'


const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return [ ...state, { id: action.payload.id, text: action.payload.text, completed: false } ];
    }
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload.id);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}


export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const handleNewChange = e => updateNewTodo(e.target.value);

  const [todos, dispatch] = useReducer(hookReducerLogger(reducer), [/*initial state*/]);
  const todoId = useRef(0)

  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload:{id: ++todoId.current, text: newTodo} });
    updateNewTodo("");
  };
  const handleDelete = (id) => { dispatch({ type: "DELETE_TODO", payload:{id}  }); };
  const handleCompletedToggle = (id) => { dispatch({ type: "TOGGLE_TODO", payload:{id} }); };

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
