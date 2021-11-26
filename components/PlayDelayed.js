import { useEffect, useState } from 'react';
import { Play } from 'rehowl'

export default function PlayDelayed( {howl, sprite, volume, delayed, delay} ) {

    const [delayMS, setdelayMS] = useState(delay)
    const [inTimeout, setInTimeout] = useState(false)

    useEffect(() => {

        if(delayed){

            if(!delay){
                setdelayMS( 500 )
                console.log('delay set to ' + delay)
            }

            setTimeout(() => setInTimeout(true), delayMS);

        }
        return () => {}
    }, [])

    //render
    if(inTimeout == true){
        return <Play howl={howl} sprite={`${sprite}`} volume={volume}  ></Play>
    }
    else{
        return <></>
    }
    
}
