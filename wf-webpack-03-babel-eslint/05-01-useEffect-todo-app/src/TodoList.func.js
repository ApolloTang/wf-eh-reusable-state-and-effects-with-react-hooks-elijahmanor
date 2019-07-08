import React, { useState, useEffect } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import About from "./About";
import { Container, List } from "./Styled";


const updateUnfinishedTodoCount = (_todos) =>  {
  const inCompleteTodos = _todos.reduce(
    (memo, todo) => (!todo.completed ? memo + 1 : memo),
    0
  );
  document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
}


export default function TodoList() {

  const initialTodos = () =>
    JSON.parse(window.localStorage.getItem("todos") || "[]");


  const [ newTodo,   updateNewTodo ] = useState("");
  const [ todos,     updateTodos   ] = useState(initialTodos);
                                       // note: useState can take a function
  let   [ showAbout, setShowAbout  ] = useState(false);



  const handleKey = ({ key }) => {
    setShowAbout(
      show =>
        key==="?"
        ? true
        : key==="Escape" ? false : show
    )
  };


  useEffect(
    () => {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    },
    [] // proved empty array only run onMount and unmount
  );


  const update = (_todos) => {
    updateUnfinishedTodoCount(_todos)
    window.localStorage.setItem("todos", JSON.stringify(_todos));
  }

  useEffect(
    () => { update(todos) },
    [todos]  // run after render whenever 'todos' change
  );





  const handleNewChange = e => updateNewTodo(e.target.value);

  const handleNewSubmit = e => {
    e.preventDefault();
    updateTodos(
      prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]
    );
    updateNewTodo("");
  };

  const handleDelete = (id /* , e */) => {
    updateTodos(
      prevTodos => prevTodos.filter(todo => todo.id !== id)
    );
  };

  const handleCompletedToggle = (id /* , e */) => {
    updateTodos(
      prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };


  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit ={handleNewSubmit}
        value    ={newTodo}
        onChange ={handleNewChange}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key     ={todo.id}
              todo    ={todo}
              onChange={handleCompletedToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
      <About
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </Container>
  );
}


