import React, { Component } from "react"

export default class Collection extends Component {

  initializeCollection() {
    return JSON.parse(window.localStorage.getItem("collection") || "[]")
  }
  state = { collection: this.initializeCollection() }



  initializeId() {
    return this.state.collection.reduce((acc, item)=>Math.max(acc, item.id), 0)
  }
  nextId = this.initializeId() // this is an instance property



  updateLocalStore(_collection) {
    window.localStorage.setItem("collection", JSON.stringify(_collection))
  }
  componentDidUpdate() {
    this.updateLocalStore(this.state.collection)
  }


  handleButtonClick = e => {
    e.preventDefault()
    this.nextId++
    this.setState(
      prevState =>(
        { collection: [ ...prevState.collection, { id: this.nextId } ], }
      )
    )
  }

  handleDelete = id => e => {
    e.preventDefault()
    this.setState(
      prevState=>(
        { collection: prevState.collection.filter(item => item.id !== id) }
      )
    )
  }


  render() {
    const { collection } = this.state
    return (
      <div>
        <button onClick={this.handleButtonClick} >Add</button>
        {!!collection.length && (
          <ul>
            {collection.map(item => (
              <li key={item.id}>
                {item.id}
               <button onClick={this.handleDelete(item.id)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
