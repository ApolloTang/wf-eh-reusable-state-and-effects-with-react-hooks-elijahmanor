import React, { useState, useContext } from "react";
import { useRef } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";
import { useReducerWithLocalStorage, useKeyDown } from "./hooks";
import { useTitle as useDocumentTitle } from "react-use";
import ThemeContext from "./ThemeContext";
import reducer from './reducer'

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);


export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useReducerWithLocalStorage(reducer, 'todos', []);

  const inCompleteCount = incompleteTodoCount(todos);
  const title = inCompleteCount ? `Todos (${inCompleteCount})` : "Todos";
  useDocumentTitle(title);

  let [showAbout, setShowAbout] = useKeyDown({ "?": true, Escape: false }, false)

  const theme = useContext(ThemeContext);

  const todoId = useRef(0)
  const handleNewSubmit = e => {
    e.preventDefault()
    dispatch({ type: "ADD_TODO", payload:{text: newTodo, id:++todoId.current}})
    updateNewTodo("")
  }
  const handleNewChange = e => { updateNewTodo(e.target.value) }

  const handleDeleteTodo = id => dispatch({type: "DELETE_TODO",payload:{id}})
  const handleToggleComplete = id => dispatch({type: "TOGGLE_TODO",payload:{id}})
  const handleAboutClose = () => {setShowAbout(false)}


  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={handleNewChange}
      />
      {!!todos.length && (
        <List theme={theme}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))}
        </List>
      )}
      <About isOpen={showAbout} onClose={handleAboutClose} />
    </Container>
  );
}
