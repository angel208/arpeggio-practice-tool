import React from 'react'
import { Chord, Note } from '@tonaljs/tonal'

var tonalFretboard = require('tonal-fretboard')
const fretBoardMap = getFretboard()
const arpeggioMap = require('../data/arpeggioShapes.json');
console.log({arpeggioMap})

function getFretboard( startingFret = 1, endingFret = 16 ){
        const tuning = tonalFretboard.tuning('guitar')
        const fretboard = tonalFretboard.notes(tuning, startingFret, endingFret)
        const normalizedFretboard = fretboard.map( stringArray => stringArray.map( (note) => { return Note.accidentals(note) == "#" ? Note.enharmonic(note) : note }) )
        return normalizedFretboard
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

function getArpeggioNotesMappedInFretboard( {arpeggioShape, startingFret} ){
        const transposedArpeggioPositions = arpeggioShape.map( subarray => subarray.map( position => position +  startingFret))
        const arpeggioFretboardMapped = fretBoardMap.map( (stringArray, stringIndex) => stringArray.map( (note, fretIndex) => {
            const flatNote = Note.accidentals(note) == "#" ? Note.enharmonic(note) : note
            return transposedArpeggioPositions[stringIndex].includes(fretIndex) ? flatNote : null
          }))
        arpeggioFretboardMapped =  arpeggioFretboardMapped.map(  (stringArray) => stringArray.filter( (note, fretIndex) => { return fretIndex >= startingFret }))
        return arpeggioFretboardMapped.reverse()
}

export {getArpegioFirstNoteFret, getArpeggioNotesMappedInFretboard, getArpegioOctave}


