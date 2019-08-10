import React, { useState, useRef, useReducer } from "react";
import { useEffect /*, useMemo */ } from "react";
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


const useReducerWithLocalStorage = (_reducer, storageName, defaultData) => {
  const readLocalStorage = ([_storageName, _defaultData]) => {
    return JSON.parse(
      window.localStorage.getItem(_storageName) || JSON.stringify(_defaultData)
    )
  }
  const writeLocalStorage = (_storageName, _data) => {
    window.localStorage.setItem(_storageName, JSON.stringify(_data))
  }

  const [data, dispatch] = useReducer(
    hookReducerLogger(_reducer),
    // useMemo(()=>readLocalStorage(storageName, defaultData), []) //<---- use useMemo to lazy init
    // (()=>readLocalStorage(storageName, defaultData))()          //<---- use IIFE to lazy init
    [storageName, defaultData], readLocalStorage                   //<---- use useReducer API to lazy init
  );
  useEffect(()=>{ writeLocalStorage(storageName, data) }, [data]);

  return [data, dispatch];
};


const getNextId = _todos => _todos.reduce((acc,todo)=>Math.max(acc, todo.id), 0)


export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const handleNewChange = e => updateNewTodo(e.target.value);

  const [todos, dispatch] = useReducerWithLocalStorage(reducer, 'todos', []);
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
