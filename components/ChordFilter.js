import React from 'react'
import styles from '../styles/ChordFilter.module.css'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'

export default function ChordFilter( { chords, callback } ) {

    const [ filteredChords , setFilteredChords ] = useState(chords.map( chord => ({ ...chord, active: 'true' })) )

    useEffect(() => {
        callback(chords.map( chord => ({ ...chord, active: 'true' })))
    }, [])

    const includeChords = (chordsToBeIncluded) => {

        let newList = [...filteredChords]

        chordsToBeIncluded.forEach( chord => {
            let objIndex = newList.findIndex((item => item.id == chord.id));
            newList[objIndex].active = true
        })   
        
        setFilteredChords(newList)
        callback(newList)
    }

    const removeChords = (chordsToBeRemoved) => {

        let newList = [...filteredChords]

        chordsToBeRemoved.forEach( chord => {
            let objIndex = newList.findIndex((item => item.id == chord.id));
            console.log("removing")
            newList[objIndex].active = false
            console.log(newList)
        }) 

        setFilteredChords(newList)
        callback(newList)

    }

    return (
        <div>
            <h1 className={styles.title}>Included Chords</h1>
            <div className={styles.notesGrid}>
            
            { 
                filteredChords.map( chord => (
    
                        <ChordButton key={chord.id} chord = { chord } includeChords={includeChords} removeChords={removeChords} enabled={ chord.active }/>

                )) 
            }
            </div>
        </div>
    )
}
