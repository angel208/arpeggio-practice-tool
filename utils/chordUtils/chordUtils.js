import React from 'react'
import { Chord, ChordType } from '@tonaljs/tonal'

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']; 

function getChordList( flat = true , chordTypes = [ 'maj7', 'm7', '7' ] ) {

        let chordList = []

        notes.forEach( note => {
            chordTypes.forEach( chordType => {
                const chord = Chord.get( note + chordType)
                chordList.push( { ...chord, active: true })
            })
        })

        if( flat == false){
            chordList =  chordList.filter( chord =>  chord.tonic[1] == null )
        }
            
        return chordList;
}

export {getChordList}


