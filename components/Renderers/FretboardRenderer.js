import React from 'react'
import styles from '../../styles/FretBoard.module.css'
import Note from './Note'

function parseNoteList( notes ) {
    if (notes == null){
        return []
    }
    let parsedNotes = notes.map( note => { return { string : note.match(/(?<=[sS]+)([1234567890]+)/g)[0], fret: note.match(/(?<=[Ff]+)([1234567890]+)/g)[0] } })
    return parsedNotes

}

export default function FretboardRenderer({ frets = 6 , strings = 6, notes}) {


    let parsedNotes = parseNoteList(notes)

    function isNoteToBeRendered( string, fret ) {
        return parsedNotes.some((note => note.string == string+1 && note.fret == fret+1) )
    }

    return (
        <div>
            <div className={styles.fretboard}>

                {[...Array(frets)].map((fret, i) => {
                    return (

                        <div key={i} className={styles.fret}>

                            <div className={styles.strings}>
                                {[...Array(strings)].map((string, j) => {
                                    return (
                                        <>
                                        
                                        <div key={j} className={`${styles.string} ${ j == (strings - 1) ? styles.lastString : ""}  ${ i == 0 ? styles.firstFret : ""}`}>
                                            { i == 0 ? <span className={styles.stringName}>{j+1}</span> : "" }
                                           { isNoteToBeRendered(string = j, fret = i)? (<Note/>) : ""}
                                        </div>
                                        </>
                                    )
                                })}
                            </div>

                        </div>

                    )
                })}

            </div>
        </div>
    )
}
