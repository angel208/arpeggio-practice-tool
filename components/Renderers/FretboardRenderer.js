import React from 'react'
import styles from '../../styles/FretBoard.module.css'
import Note from './Note'

export default function FretboardRenderer({ frets = 6 , strings = 6, initialFret = 0, notes}) {

    return (
        <div>
            <div className={styles.fretboard}>
                {[...Array(frets)].map((fret, fretIndex) => {
                    return (
                        <div key={fretIndex} className={styles.fret}>
                            <div className={styles.strings}>
                                {[...Array(strings)].map((string, stringIndex) => { 
                                    return (
                                        <div key={stringIndex} className={`${styles.string} ${ stringIndex == (strings - 1) ? styles.lastString : ""}  ${ fretIndex == 0 ? styles.firstFret : ""}`}>
                                            { fretIndex == 0 ? <span className={styles.stringName}>{stringIndex+1}</span> : "" }
                                            { ( notes[stringIndex] != null && notes[stringIndex][fretIndex] != null )  ? (<Note text={notes[stringIndex][fretIndex]}/>) : ""}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.fretNumber}>{fretIndex + initialFret + 1}</div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
