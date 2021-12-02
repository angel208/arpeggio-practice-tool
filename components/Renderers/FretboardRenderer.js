import React from 'react'
import styles from '../../styles/FretBoard.module.css'
import Note from './Note'

function parseNoteList( notes ) {
    let parsedNotes = notes.map( note => { return { string : note.match(/(?<=[sS]+)([1234567890]+)/g)[0], fret: note.match(/(?<=[Ff]+)([1234567890]+)/g)[0] } })
    return parsedNotes

}

export default function FretboardRenderer({ frets = 6 , strings = 6, notes = [ 's1f1', 's1f5', 's2f1', 's2f5', 's3f3', 's4f2', 's4f3', 's5f3', 's6f1', 's6f5' ]}) {


    let parsedNotes = parseNoteList(notes)

    function isNoteToBeRendered( string, fret ) {
        console.log(parsedNotes.some( note => (note.string == string+1 && note.fret == fret+1 )))
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
                                        <div key={j} className={`${styles.string} ${ j == (strings - 1) ? styles.lastString : ""}  ${ i == 0 ? styles.firstFret : ""}`}>
                                           { isNoteToBeRendered(string = j, fret = i)? (<Note/>) : ""}
                                        </div>
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
