import React from 'react'
import { useState, useEffect} from 'react'
import styles from '../styles/ChordButton.module.css'
import useStore from '../utils/hooks/useStore'
import useUpdateEffect from '../utils/hooks/useUpdateEffect'

export default function ChordButton( { chord, active, callback } ) {


    const [chordSymbol, setChordSymbol] = useState(chord.symbol)

    const includeChords = useStore(state => state.includeChords)  
    const removeChords = useStore(state => state.removeChords)  

    function alternateActive () {
        callback( chord )
    }
 
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
