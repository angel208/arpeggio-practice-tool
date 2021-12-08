import { useEffect, useRef } from 'react'

export default function useUpdateEffect(callback, params) {
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
           isInitialMount.current = false;
        } else {
            callback()
        }
      }, [...params]);
  }