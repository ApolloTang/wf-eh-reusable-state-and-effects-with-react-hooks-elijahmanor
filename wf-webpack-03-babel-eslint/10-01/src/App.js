import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./TodoList.func";
import Switch from "./Switch";
import { Helmet } from "react-helmet";
import ThemeContext from "./ThemeContext";
import styled from "@emotion/styled";


const Container = styled("div")`
  margin: 3em auto 1em auto;
  width: 75%;
  display: flex;
  justify-content: flex-end;
`;
const styles = {
  dark: `html {
  /* https://uigradients.com/#DarkOcean */
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient( to right, #4286f4, #373b44 ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient( to right, #4286f4, #373b44 ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}`,
  light: `html {
  /* https://uigradients.com/#SunnyDays */
  background: #EDE574;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #EDE574, #E1F5C4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #EDE574, #E1F5C4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}`
};



const useStateWithLocalStorage = (storageName, defaultData) => {
  const readLocalStorage = (_storeName, _defaultData) => JSON.parse(
    window.localStorage.getItem(_storeName) || JSON.stringify(_defaultData)
  )
  const writeLocalStorage = (_storageName, _data) => {
    window.localStorage.setItem(_storageName, JSON.stringify(_data))
  }
  const [data, updateStorage] = useState(readLocalStorage(storageName, defaultData))
  useEffect( () => { writeLocalStorage(storageName, data) }, [data])
  return [data, updateStorage]
}



const App = () =>  {
  const [theme, updateTheme] = useStateWithLocalStorage('theme', 'dark')

  const handleThemeChange = flag => {
    const theme = flag ? "light" : "dark";
    updateTheme(theme);
  };

  return (
    <main>
      <Helmet>
        <style>{styles[theme]}</style>
      </Helmet>
      <ThemeContext.Provider value={theme}>
        <Container>
          <Switch
            checked={theme === "light"}
            onChange={handleThemeChange}
          />
        </Container>
        <TodoList />
      </ThemeContext.Provider>
    </main>
  );
}

export default App
