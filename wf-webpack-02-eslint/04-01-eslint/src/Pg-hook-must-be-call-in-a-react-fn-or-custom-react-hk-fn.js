
import React, { useState } from "react";


const dontDoThis = () => {

  // React Hook "useState" is called in function "dontDoThis"
  // which is neither a React function component or a custom React
  // Hook function.
  const [nope, setNope] = useState("");

};


export default function Playground() {
  const [text, setText] = useState("");
  return (
    <section>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul>
        <li>{text}</li>
      </ul>
    </section>
  );
}



