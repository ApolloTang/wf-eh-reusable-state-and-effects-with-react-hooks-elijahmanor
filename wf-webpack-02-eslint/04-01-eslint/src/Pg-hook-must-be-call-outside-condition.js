
import React, { useState } from "react";

export default function Playground() {

  // hook must be called at top level, like in next line
  const [text, setText] = useState("");

  if (new Date().getDay() === 1) {
    // 1. React Hook "useState" cannot be called conditionally.
    // 2. React Hooks must be called in the exact same order in
    //    every component render.
    const [special, setSpecial] = useState(false);
  }

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



