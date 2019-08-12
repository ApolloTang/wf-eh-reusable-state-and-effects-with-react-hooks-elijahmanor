import { useState, useEffect, useMemo, useRef, useReducer } from "react";
import hookReducerLogger from './hookReducerLogger'
import reducer from './reducer'


export const useKeyDown = (map, defaultValue) => {
  let [match, setMatch] = useState(defaultValue);
  useEffect(() => {
    const handleKey = ({ key }) => {
      setMatch(prevMatch =>
        Object.keys(map).some(k => k === key) ? map[key] : prevMatch
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return [match, setMatch];
};



export const useLocalStorage = (key, defaultValue, callback) => {
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
    if (callback) {
      callback(valueFromStorage);
    }
    return valueFromStorage;
  };
  const [storage, updateStorage] = useState(initialValue);
  useEffect(
    () => {
      window.localStorage.setItem(key, JSON.stringify(storage));
    },
    [storage]
  );
  return [storage, updateStorage];
};



export const useTodosWithLocalStorage = defaultValue => {
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem("todos") || JSON.stringify(defaultValue)
    );
    return valueFromStorage;
  };

  const [todos, dispatch] = useReducer(
    hookReducerLogger(reducer),
    useMemo(initialValue, [])
  );

  useEffect( () => { window.localStorage.setItem("todos", JSON.stringify(todos)); }, [todos]);
  return [todos, dispatch];
};


export const useStateWithLocalStorage = (storageName, defaultData) => {
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
