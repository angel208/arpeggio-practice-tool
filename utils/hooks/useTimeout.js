import { useEffect, useLayoutEffect, useRef } from 'react'

export default function useTimeout(callback, delay) {
    const savedCallback = useRef(callback)
  
    useLayoutEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    useEffect(() => {
      if (!delay && delay !== 0) {
        return
      }
  
      const id = setTimeout(() => savedCallback.current(), delay)
  
      return () => clearTimeout(id)
    }, [delay])
  }