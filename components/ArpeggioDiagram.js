import React from 'react'
import { useEffect, useState } from 'react';
import FretboardRenderer from './Renderers/FretboardRenderer';
import { Chord, transpose, Note } from '@tonaljs/tonal';
var tonalFretboard = require('tonal-fretboard')


function getIntervals(chordString) {

  let intervals = Chord.get(chordString).intervals
  let notes = Chord.get(chordString).notes.map( note => note == "Cb" ? "B" : note).map( note => note == "Fb" ? "E" : note).map( note => note == "Bbb" ? "A" : note)
  let flatNotes = notes.map( note => Note.accidentals(note) == "#" ? Note.enharmonic(note) : note)
  let notesWithIntervals = intervals.map( (interval, intervalIndex) => { return { note: flatNotes[intervalIndex] , interval: interval }  } )
  return notesWithIntervals
}

function getFretboard( startingFret = 1, endingFret = 16 ){
  const tuning = tonalFretboard.tuning('guitar')
  const fretboard = tonalFretboard.notes(tuning, startingFret, endingFret)
  const normalizedFretboard = fretboard.map( stringArray => stringArray.map( (note) => { return Note.accidentals(note) == "#" ? Note.enharmonic(note) : note }) )
  return normalizedFretboard
}


const fretBoardMap = getFretboard()
const arpeggioMap = require('../data/arpeggioShapes.json');


export default function ArpeggioDiagram( { chordString, string = 6, finger = 1 } ) {

    const [notes, setNotes] = useState([])
    const [intervalMap, setIntervalMap] = useState([])
    const [initialFret, setInitialFret] = useState(0)

 
    useEffect(() => {

      if( chordString ){
        const chordTypeSymbol = Chord.get( chordString ).aliases[0]
        const chordTonic = Chord.get(chordString).tonic
        const arpeggioRootPosition = arpeggioMap[chordTypeSymbol][finger][string]['root']
        const arpeggioPositions = arpeggioMap[chordTypeSymbol][finger][string]['shape']

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
        setInitialFret(tonicFretPosition - arpeggioRootPosition)
        const arpeggioFirstNotePosition = tonicFretPosition - arpeggioRootPosition;
        const transposedArpeggioPositions = arpeggioPositions.map( subarray => subarray.map( position => position +  arpeggioFirstNotePosition))
        const arpeggioFretboardMapped = fretBoardMap.map( (stringArray, stringIndex) => stringArray.map( (note, fretIndex) => {
            const flatNote = Note.accidentals(note) == "#" ? Note.enharmonic(note) : note
            return transposedArpeggioPositions[stringIndex].includes(fretIndex) ? flatNote : null
          }))
        arpeggioFretboardMapped =  arpeggioFretboardMapped.map(  (stringArray) => stringArray.filter( (note, fretIndex) => { return fretIndex >= arpeggioFirstNotePosition }))
        setNotes(arpeggioFretboardMapped)
        setIntervalMap(getIntervals(chordString))
        console.log({ string,  finger})
        console.log({chordTypeSymbol})
        console.log({chordTonic})
        console.log({arpeggioRootPosition})
        console.log({arpeggioPositions})
        console.log({tonicFretPosition})
        console.log({transposedArpeggioPositions})
        console.log({tonicFretPosition})
        console.log({notes: arpeggioFretboardMapped.reverse()})
        console.log({interval: getIntervals(chordString)})
      }

    }, [chordString])


    return (
        <div>
          <FretboardRenderer initialFret={initialFret} notes={notes} showIntervals={true} intervalMap={intervalMap} />
        </div>
    )
}
