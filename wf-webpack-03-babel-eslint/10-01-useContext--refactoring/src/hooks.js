import { useState, useEffect, useReducer } from "react";
import hookReducerLogger from './hookReducerLogger'


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


export const useReducerWithLocalStorage = (_reducer, storageName, defaultData) => {
  const readLocalStorage = ([_storageName, _defaultData]) => JSON.parse(
    window.localStorage.getItem(_storageName) || JSON.stringify(_defaultData)
  )
  const writeLocalStorage = (_storageName, data) => {
    window.localStorage.setItem(_storageName, JSON.stringify(data))
  }

  const [data, dispatch] = useReducer(
    hookReducerLogger(_reducer),
    [storageName, defaultData],
    readLocalStorage
  );
  useEffect( () => { writeLocalStorage("todos", data) }, [data]);

  return [data, dispatch];
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
