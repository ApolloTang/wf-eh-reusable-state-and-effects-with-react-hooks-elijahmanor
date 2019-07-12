import React, {useState, useEffect, useRef } from "react"

export default function Collection() {

  const initializeCollection = () => {
    return JSON.parse(window.localStorage.getItem("collection") || "[]")
  }
  const [collection, updateCollection] = useState(initializeCollection)



  const initializeId = () => {
    return collection.reduce((acc, item)=>Math.max(acc, item.id), 0)
  }
  const nextId = useRef(initializeId()) // this is an instance property



  const updateLocalStore = _collection => {
    window.localStorage.setItem("collection", JSON.stringify(_collection))
  }
  useEffect(
    ()=>{ updateLocalStore(collection) }, [collection]
  )


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
              {item.id}
             <button onClick={handleDelete(item.id)}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
