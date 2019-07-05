
import React, { useState } from "react";

const todos = ["one", "two", "three"];

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
        {todos.map(item => {

          // React Hook "useState" cannot be called
          // inside a callback.
          const [count, setCount] = useState(0);
          return (
            <li onClick={() => setCount(count + 1)}>
              {item}: {count}
            </li>
          );
        })}
        <li>{text}</li>
      </ul>
    </section>
  );
}



