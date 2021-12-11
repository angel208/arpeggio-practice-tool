import React from 'react'
import styles from '../../styles/FretBoard.module.css'
import Note from './Note'

function getInterval(note, intervalMap) {

    if ( !note || !intervalMap ) return null

    let pattern=new RegExp( `[ABCDEFGb#]+`,"g");
    let rawNote = note.match(pattern)[0]
    let interval = intervalMap.find( interval => {return interval.note == rawNote} )?.interval 
    return interval == "1P" ? "R" : interval
}

export default function FretboardRenderer({ frets = 6 , strings = 6, initialFret = 0,  showIntervals, notes, intervalMap}) {
    return (
        <div>
            <div className={styles.fretboard}>
                {[...Array(frets)].map((fret, fretIndex) => {
                    return (
                        <div key={fretIndex} className={styles.fret}>
                            <div className={styles.strings}>
                                {[...Array(strings)].map((string, stringIndex) => { 
                                    const note = notes[stringIndex]?.[fretIndex]
                                    const intervalName = getInterval(note, intervalMap)
                                    return (
                                        <div key={stringIndex} className={`${styles.string} ${ stringIndex == (strings - 1) ? styles.lastString : ""}  ${ fretIndex == 0 ? styles.firstFret : ""}`}>
                                            { fretIndex == 0 ? <span className={styles.stringName}>{stringIndex+1}</span> : "" }
                                            { ( note != null && showIntervals && intervalMap )  ? (<Note text={intervalName} root={(intervalName == "R" || intervalName == "1" || intervalName == "1P")}/>) : ""}
                                            { ( note != null && (!showIntervals || !intervalMap))  ? (<Note text={note} root={(intervalName == "R" || intervalName == "1" || intervalName == "1P")} />) : ""}
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
