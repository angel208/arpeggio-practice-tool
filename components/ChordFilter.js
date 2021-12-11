import React from 'react'
import styles from '../styles/ChordFilter.module.css'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'
import ToggleSwitch from './Filters/ToggleSwitch'
import useStore from '../utils/hooks/useStore'
import { Note } from '@tonaljs/tonal'

export default function ChordFilter( ) {

    const includedChords = useStore(state => state.includedChords)
    const includeChords = useStore(state => state.includeChords)  
    const removeChords = useStore(state => state.removeChords)  

    const [flats, setFlats] = useState(false)

    function toggleFlats( flats) {

        const flatChordList = includedChords.filter( chord => Note.get( chord.tonic ).alt != 0  )

        if(flats)
            includeChords(flatChordList)
        else
            removeChords(flatChordList)

        setFlats(flats)
    }


    return (
        <div>
            <h3 className={styles.title}>Included Chords</h3>
            <div className={styles.notesGrid}>
            
            { 
                includedChords.map( chord => (
    
                        <ChordButton key={chord.symbol} chord = { chord } enabled={ chord.active }/>

                )) 
            }
            
            </div>
            <ToggleSwitch name={`flats`} checked={flats} callBack={ () => {toggleFlats(!flats)} } />

        </div>
    )
}
