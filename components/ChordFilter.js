import React from 'react'
import styles from '../styles/ChordFilter.module.css'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'
import useStore from '../utils/hooks/useStore'

export default function ChordFilter( ) {

    const includedChords = useStore(state => state.includedChords)
    const includeChords = useStore(state => state.includeChords)  
    const removeChords = useStore(state => state.removeChords)  

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
        </div>
    )
}
