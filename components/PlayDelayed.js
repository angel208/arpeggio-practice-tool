import { useState } from 'react';
import { Play } from 'rehowl'
import useTimeout from '../utils/hooks/useTimeout';

export default function PlayDelayed( {howl, sprite, volume, delayed, delay = 500} ) {
    const [completed, setCompleted] = useState(false)

    useTimeout(() => {
        setCompleted(true)
    }, delay)

    if ( delayed && !completed ) return null

    return <Play howl={howl} sprite={`${sprite}`} volume={volume}  />
}

