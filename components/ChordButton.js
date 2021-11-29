import React from 'react'
import { useState, useEffect} from 'react'
import styles from '../styles/ChordButton.module.css'

export default function ChordButton( { chord, enabled = true, includeChords,  removeChords} ) {

    const [active, setActive] = useState(enabled)
    const [chordSymbol, setChordSymbol] = useState(chord.symbol)

    function alternateActive () {
        setActive( !active )
        console.log( !active )
    }
    
    useEffect(() => {
        
        if( active )
            includeChords([chord])
        else
            removeChords([chord])
        
    }, [active])

    useEffect(() => {
        
        setActive(enabled)
        
    }, [enabled])

    return (
        <div  id={chordSymbol} onClick={  alternateActive }>
            
            <a className={`${styles.single} ${ active ? styles.active : "" }`}>
                <h3>
                    { chordSymbol }
                </h3>
            </a>

        </div>
    )
}
