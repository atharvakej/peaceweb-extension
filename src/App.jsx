import { useState } from "react";
import "./App.css";

function App() {
  const [isOn, setIsOn] = useState("On");

  return (
    <>
      <h1>Peace Web</h1>
      <div className="container">
        <div className="switches-container">
          <input
            type="radio"
            id="switchOn"
            name="switchPlan"
            value="On"
            checked={isOn === "On"}
            onClick={() => setIsOn("On")}
          />
          <input
            type="radio"
            id="switchOff"
            name="switchPlan"
            value="Off"
            checked={isOn === "Off"}
            onClick={() => setIsOn("Off")}
          />
          <label htmlFor="switchOn">On</label>
          <label htmlFor="switchOff">Off</label>
          <div className="switch-wrapper">
            <div className="switch">
              <div>On</div>
              <div>Off</div>
            </div>
          </div>
        </div>
        <p>
          <small>NB: Input radios are used toggle the switch state.</small>
        </p>
      </div>
    </>
  );
}

export default App;
