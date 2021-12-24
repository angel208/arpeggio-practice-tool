import React from 'react'
import { Chord, Note } from '@tonaljs/tonal'

const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']; 

function getChordList( {flat = true , chordTypes = [ 'maj7', 'm7', '7', 'm7b5' ] }) {

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

function getChordNotes( chordSymbolString ){
    let notes = Chord.get(chordSymbolString).notes.map( note => note == "Cb" ? "B" : note).map( note => note == "Fb" ? "E" : note).map( note => note == "Bbb" ? "A" : note)
    let flatNotes = notes.map( note => Note.accidentals(note) == "#" ? Note.enharmonic(note) : note)
    return flatNotes
}

export {getChordList, getChordNotes}


