import React, {useState, useEffect, useRef } from "react"

const useLocalStorage = (key, defaultValue) => {
  const readLocalStore = (_key, _defaultValue) => JSON.parse(
    window.localStorage.getItem(_key) || JSON.stringify(_defaultValue)
  )
  const updateLocalStore = _data => {
    window.localStorage.setItem(key, JSON.stringify(_data))
  }

  const [data, updateStorage] = useState( readLocalStore(key, defaultValue))

  useEffect(()=>{ updateLocalStore(data) }, [data])

  return [data, updateStorage];
};


function ComponentFactory(storageName) {
  return function Collection () {

    const [collection, updateCollection] = useLocalStorage(storageName, [])

    const getInitialId = () => {
      return collection.reduce((acc, item)=>Math.max(acc, item.id), 0)
    }
    const nextId = useRef(getInitialId()) // this is an instance property

    const handleButtonClick = e => {
      e.preventDefault()
      nextId.current++
      updateCollection(
        prevCollection => [ ...prevCollection, { id: nextId.current } ]
      )
    }

    const handleDelete = id => e => {
      e.preventDefault()
      updateCollection(
        prevCollection => prevCollection.filter(item => item.id !==id)
      )
    }

    return (
      <div>
        <button onClick={handleButtonClick} >Add</button>
        {!!collection.length && (
          <ul>
            {collection.map(item => (
              <li key={item.id}>
                {storageName} {item.id}
               <button onClick={handleDelete(item.id)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}


const CollectionOne = ComponentFactory('One')
const CollectionTwo = ComponentFactory('Two')
export {CollectionOne, CollectionTwo}
