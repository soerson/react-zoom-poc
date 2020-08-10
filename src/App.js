import React, { useEffect } from 'react';
import { config }           from './config'
import { ZoomMtg } from '@zoomus/websdk'

import './App.css';


function App() {
  const {
    signatureEndpoint,
    meetingNumber,
    role,
    leaveUrl,
    userName,
    apiKey,
    userEmail,
    passWord
  } = config;

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
  }, [])

  const joinMeeting = (signature) => {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log('Init success: ', success)

        ZoomMtg.join({
          signature,
          meetingNumber,
          userName,
          apiKey,
          userEmail,
          passWord,
          success: (success) => {
            console.log('Join success: ', success)
          },
          error: (error) => {
            console.error('Join error: ', error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  const getSignature = () => {
    fetch(signatureEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        meetingNumber,
        role
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.signature) {
          console.log(data.signature)
          joinMeeting(data.signature)
        } else {
          console.error('Could not get a signature.', data)
        }
      })
  }

  return (
    <div className="App">
      <button onClick={getSignature}>Join meeting</button>
    </div>
  );
}

export default App;
