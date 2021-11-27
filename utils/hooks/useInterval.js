import { useEffect, useLayoutEffect, useRef } from 'react'

//credit to https://usehooks-ts.com/react-hook/use-interval
export default function useInterval(callback , delay) {

  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {

    console.log("entro a useInterval")
    savedCallback.current = callback

  }, [callback])


  // Set up the interval.

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }
    console.log("entro a useInterval 2")
    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)

  }, [delay])

}
