import React, { useState, useRef, useReducer } from "react";
import { useEffect, useMemo } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";


const useTodosWithLocalStorage = defaultValue => {

  const todoId = useRef(0);

  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem("todos") || JSON.stringify(defaultValue)
    );
    todoId.current = valueFromStorage.reduce( (memo, todo) => Math.max(memo, todo.id), 0);
    return valueFromStorage;
  };

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
    },
    useMemo(initialValue, [])
  );

  useEffect(() => {window.localStorage.setItem("todos", JSON.stringify(todos)); }, [todos]);

  return [todos, dispatch];
};

export default function TodoList() {

  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useTodosWithLocalStorage([]);

  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    updateNewTodo("");
  };
  const handleNewChange = e => updateNewTodo(e.target.value);
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
