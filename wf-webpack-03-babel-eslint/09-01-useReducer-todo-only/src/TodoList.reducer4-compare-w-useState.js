import React, { useState, useRef } from "react";
import { useEffect } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";




















const useStateWithLocalStorage = (storageName, defaultData) => {
  const readLocalStorage = (_storageName, _defaultData) => JSON.parse(
    window.localStorage.getItem(_storageName) || JSON.stringify(_defaultData)
  )
  const writeLocalStorage = (_storageName, _data) => {
    window.localStorage.setItem(_storageName, JSON.stringify(_data))
  }

  const [data, updateStorage] = useState(
    readLocalStorage(storageName, defaultData)
  )
  useEffect(()=>{ writeLocalStorage(storageName, data) }, [data]);

  return [data, updateStorage];
};


const getNextId = _todos => _todos.reduce((acc,todo)=>Math.max(acc, todo.id), 0)


export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const handleNewChange = e => updateNewTodo(e.target.value);

  const [todos, updateTodos] = useStateWithLocalStorage('todos', []);
  const nextId = useRef(getNextId(todos))

  const handleNewSubmit = e => {
    e.preventDefault();
    updateTodos(prevTodos => [...prevTodos, {id:++nextId.current, text: newTodo, completed: false }]);
    updateNewTodo("");
  };
  const handleDelete = id => { updateTodos( prevTodos => prevTodos.filter( todo=>todo.id !== id )) }
  const handleCompletedToggle = id => { updateTodos(
    prevTodos => prevTodos.map( todo=> (todo.id===id) ? {...todo, completed:!todo.completed} : todo)
  )}

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
