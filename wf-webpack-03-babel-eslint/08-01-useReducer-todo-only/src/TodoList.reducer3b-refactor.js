import React, { useState, useRef, useReducer } from "react";
import { useEffect, useMemo } from "react";
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


const useReducerWithLocalStorage = (key, defaultData) => {
  const readLocalStorage = (_key, _defaultData) => JSON.parse(
    window.localStorage.getItem(_key) || JSON.stringify(_defaultData)
  )
  const writeLocalStorage = (_key, _data) => {
    window.localStorage.setItem(_key, JSON.stringify(_data))
  }

  const [data, dispatch] = useReducer(
    hookReducerLogger(reducer),
    useMemo(()=>readLocalStorage(key, defaultData), [])
  );
  useEffect(()=>{ writeLocalStorage(key, data) }, [data]);

  return [data, dispatch];
};


const getNextId = _todos => _todos.reduce((acc,todo)=>Math.max(acc, todo.id), 0)


export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const handleNewChange = e => updateNewTodo(e.target.value);

  const [todos, dispatch] = useReducerWithLocalStorage('todos', []);
  const nextId = useRef(getNextId(todos))

  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload:{id:++nextId.current, text: newTodo} });
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
