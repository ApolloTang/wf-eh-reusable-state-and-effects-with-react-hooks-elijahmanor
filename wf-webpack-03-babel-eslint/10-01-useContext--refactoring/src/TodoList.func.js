import React, { useState, useContext } from "react";
import { useRef } from "react";
import NewTodo from "./NewTodo";
// import TodoItem from "./TodoItem.class1";
// import TodoItem from "./TodoItem.class2";
import TodoItem from "./TodoItem.func";
import { Container, List } from "./Styled";
import About from "./About";
import { useReducerWithLocalStorage, useKeyDown } from "./hooks";
import { useTitle as useDocumentTitle } from "react-use";
import ThemeContext from "./ThemeContext";
import reducer from './reducer'

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

const calGreatestTodoId = (todos=[], startId=0) =>
  todos.reduce((acc, todo)=>Math.max(acc,todo.id), startId)

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
    let prevId = calGreatestTodoId(todos, todoId.current) //@TODO only have to do this on reload
    dispatch({ type: "ADD_TODO", payload:{text: newTodo, id:++prevId}})
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
