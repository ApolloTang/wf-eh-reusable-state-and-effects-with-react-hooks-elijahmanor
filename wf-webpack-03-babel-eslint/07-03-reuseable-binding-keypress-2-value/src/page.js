import React from 'react'
import {useState, useEffect} from 'react'

import MyDialog from './myDialog'


const useKeyDown = (keyMap, defaultValue) => {
  let [match, setMatch] = useState(defaultValue);

  const handleKeyDown = ({ key:keyPressed }) => {

    const getNextMatch = prevMatch =>
      Object.keys(keyMap).some(k => k === keyPressed)
      ? keyMap[keyPressed]  // if keyPressed exists in keyMap's key used its value
      : prevMatch           // else use its previous value

    setMatch(getNextMatch)
  };


  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [/* onMount and unMount */]);

  return [match, setMatch];
};


const Page = () => {
  const keyMap = {
    // show dialog onKeydown: '?', 'o'
    // close dialog onKeydown: 'Escape', 'c'
    '?': true,
    'o': true,
    'Escape': false,
    'c': false
  }
  const showDialogInitialState = false // Dialog not shown initially

  let [showDialog, setShowDialog] = useKeyDown( keyMap, showDialogInitialState )

  const handleDialogClose = () => setShowDialog(false)

  return (
    <div>
      <div>
        <h1> This is a page </h1>
        <p> the content is here </p>
      </div>
      <MyDialog isOpen={showDialog} onClose={handleDialogClose} />
    </div>
  )
}

export default Page
