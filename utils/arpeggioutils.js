import React from 'react'
import { Chord, Note } from '@tonaljs/tonal'
import {getChordNotes} from '../utils/chordUtils'

const arpeggioMap = require('../data/arpeggioShapes.json');

var tonalFretboard = require('tonal-fretboard')
const fretBoardMap = getTonalFretboard()


function getTonalFretboard( startingFret = 1, endingFret = 16 ){
        const tuning = tonalFretboard.tuning('guitar')
        const fretboard = tonalFretboard.notes(tuning, startingFret, endingFret)
        const normalizedFretboard = fretboard.map( stringArray => stringArray.map( (note) => { return Note.accidentals(note) == "#" ? Note.enharmonic(note) : note }) )
        return normalizedFretboard
}

function getIntervalFromNote(note, intervalMap) {

        if ( !note || !intervalMap ) return null

        let pattern=new RegExp( `[ABCDEFGb#]+`,"g");
        let rawNote = note.match(pattern)[0]
        let interval = intervalMap.find( interval => {return interval.note == rawNote} )?.interval 
        return interval == "1P" ? "R" : interval
}


function getIntervalMap(chordString) {

        let intervals = Chord.get(chordString).intervals
        let notes = getChordNotes(chordString)
        let notesWithIntervals = intervals.map( (interval, intervalIndex) => { return { note: notes[intervalIndex] , interval: interval }  } )
        return notesWithIntervals

}
      

function getArpegioOctave( chordString, string, finger  ){
        
        if( chordString && string && finger ){
                const chordTypeSymbol = Chord.get( chordString ).aliases[0]
                const chordTonic = Chord.get(chordString).tonic
                const arpeggioRootPosition = arpeggioMap[chordTypeSymbol][finger][string]['root']

                let tonicNoteWithOctave
                fretBoardMap[ 6 - string ].find(function(note,index){
                var pattern=new RegExp( `(${chordTonic})[012345678]`,"g");
                if(note.match(pattern) && index >= arpeggioRootPosition ){
                        tonicNoteWithOctave = note;
                        return true;
                }else{
                        return false;
                }
                });

                const octave = tonicNoteWithOctave.at(-1)
                return octave
        }
        else{
                return 2
        }
}


function getArpegioFirstNoteFret( chordString, string, finger ) {

        try {

                const chordTypeSymbol = Chord.get( chordString ).aliases[0]
                const chordTonic = Chord.get(chordString).tonic
                const arpeggioRootPosition = arpeggioMap[chordTypeSymbol][finger][string]['root']
        
                let tonicFretPosition
                fretBoardMap[ 6 - string ].find(function(note,index){
                    var pattern=new RegExp( `(${chordTonic})[012345678]`,"g");
                    if(note.match(pattern) && index >= arpeggioRootPosition ){
                        tonicFretPosition = index;
                        return true;
                    }else{
                        return false;
                    }
                });
        
                return tonicFretPosition - arpeggioRootPosition
        }
        catch(e){
           return null;
        }
        
}

function getArpeggioNotesMappedInFretboard( {chordString, arpeggioShape, startingFret, showIntervals = true } ){

        const intervalMap = getIntervalMap(chordString)
        const transposedArpeggioPositions = arpeggioShape.map( subarray => subarray.map( position => position +  startingFret))
        
        const arpeggioFretboardMapped = fretBoardMap.map( (stringArray, stringIndex) => stringArray.map( (note, fretIndex) => {
            
            const fretText = ''

            if( showIntervals ){
                const intervalName = getIntervalFromNote(note, intervalMap)
                fretText = intervalName
            }
            else{
                const flatNote = Note.accidentals(note) == "#" ? Note.enharmonic(note) : note
                fretText = flatNote
            }
        
            return transposedArpeggioPositions[stringIndex].includes(fretIndex) ? fretText : null

          }))

        arpeggioFretboardMapped =  arpeggioFretboardMapped.map(  (stringArray) => stringArray.filter( (note, fretIndex) => { return fretIndex >= startingFret }))
        return arpeggioFretboardMapped.reverse()
}

export {getArpegioFirstNoteFret, getArpeggioNotesMappedInFretboard, getArpegioOctave}


