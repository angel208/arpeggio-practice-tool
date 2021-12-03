import React from 'react'
import styles from '../styles/ChordFilter.module.css'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'

export default function ChordFilter( { chords, callback } ) {

    const [ filteredChords , setFilteredChords ] = useState( chords )

    useEffect(() => {
        callback( filteredChords )
    }, [])

    const includeChords = (chordsToBeIncluded) => {

        let newList = [...filteredChords]

        chordsToBeIncluded.forEach( chord => {
            let objIndex = newList.findIndex((item => item.symbol == chord.symbol));
            newList[objIndex].active = true
        })   
        
        setFilteredChords(newList)
        callback(newList)
    }

    const removeChords = (chordsToBeRemoved) => {

        let newList = [...filteredChords]

        chordsToBeRemoved.forEach( chord => {
            let objIndex = newList.findIndex((item => item.symbol == chord.symbol));
            console.log("removing")
            newList[objIndex].active = false
            console.log(newList)
        }) 

        setFilteredChords(newList)
        callback(newList)

    }

    return (
        <div>
            <h3 className={styles.title}>Included Chords</h3>
            <div className={styles.notesGrid}>
            
            { 
                filteredChords.map( chord => (
    
                        <ChordButton key={chord.symbol} chord = { chord } includeChords={includeChords} removeChords={removeChords} enabled={ chord.active }/>

                )) 
            }
            </div>
        </div>
    )
}
