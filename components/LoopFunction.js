import React from 'react'
import { useState } from 'react';
import  useInterval  from '../utils/hooks/useInterval'

export default function LoopFunction( {callback, delay, isPlaying}  ) {
  // The counter
  const [count, setCount] = useState(0)
  
  useInterval(
    () => {
      // Your custom logic here
      console.log("test" + isPlaying + "+" + delay)
      callback()
      setCount(count + 1)
    },

    // Delay in milliseconds or null to stop it
    
    isPlaying ? delay : null
  )

    return (
        <div>
            
        </div>
    )
}
