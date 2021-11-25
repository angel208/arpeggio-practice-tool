import React, { useState } from 'react'
import usePlayChord from '../utils/hooks/usePlayChord'
import { useHowl, Play } from 'rehowl'
import ChordPlayer from '../components/ChordPlayer'



export default function ChordTest() {

    const [ chordString, setChordString ] = useState('Cmaj7')

    return (
        <div>
            hello2
            <p>{chordString}</p>
            <ChordPlayer chordString={`${chordString}`}/>  
            <button onClick={ () => setChordString('Cmaj7') }>Cmaj7</button>
            <button onClick={ () => setChordString('Bmaj7') }>Bmaj7</button>
            <button onClick={ () => setChordString('D7') }>D7</button>
            <button onClick={ () => setChordString('Fdim7') }>Fdim7</button>
        </div>
    )
}
