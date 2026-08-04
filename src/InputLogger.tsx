import { useState } from "react";

function InputLogger() {
  const [value, setValue] = useState("");

  function inputLoggerAction() {
    console.log(`InputLogger rendered with value: ${value}`);
  }

  return (
    <div className="input-logger">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type here"
        className="input-logger__input"
      />
      <button type="button" className="input-logger__button" onClick={inputLoggerAction}>
        Log
      </button>
    </div>
  );
}

export default InputLogger;
