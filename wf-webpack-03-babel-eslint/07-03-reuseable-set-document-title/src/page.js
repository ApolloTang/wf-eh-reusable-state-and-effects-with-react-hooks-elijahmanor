
import React from 'react'
import {useState, useEffect} from 'react'

const useDocumentTitle = title => {
  useEffect( () => { document.title = title; }, [title]);
};

const Page = () => {
  const [inputValue, setInputValue] = useState('')
  useDocumentTitle(inputValue)

  const handleInputChange = e => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Page
