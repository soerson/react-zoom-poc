import React      from 'react';
import { config } from "./config"
import './App.css';

function App() {
  const {
    signatureEndpoint,
    meetingNumber,
    role,
  } = config;

  const getSignature = () => {
    fetch(signatureEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        meetingNumber,
        role
      })
    })
      .then(res => res.json())
      .then(data => console.log(data.signature))
  }

  return (
    <div className="App">
      <button onClick={getSignature}>Join meeting</button>
    </div>
  );
}

export default App;
