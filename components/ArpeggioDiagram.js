import React from 'react'
import { useEffect, useState } from 'react';
import FretboardRenderer from './Renderers/FretboardRenderer';
import { Chord } from '@tonaljs/tonal';
var tonalFretboard = require('tonal-fretboard')

export default function ArpeggioDiagram( { chordString, string = 6, finger = 1 } ) {

    const arpeggioMap = {
      'maj7' : [ [0, 4], [2], [1,2], [1,4], [4], [0,4] ],
      '7' :    [ [0, 4], [2], [0,2], [1,4], [3], [0,4] ],
      'm7' :   [ [0, 3], [2], [0,2], [0,4], [3], [0,3] ],
      'm7b5' : [ [0, 3], [1], [0,2], [0,3], [3], [0,3] ],
    }

    const tuning = tonalFretboard.tuning('guitar')

    const [notes, setNotes] = useState([])
    const [initialFret, setInitialFret] = useState(0)
    const [fretBoardMap, setFretBoardMap] = useState( tonalFretboard.notes(tuning, 1, 16) )

 
    useEffect(() => {

      if( chordString ){

        const chordTypeSymbol = Chord.get( chordString ).aliases[0]
        const chordTonic = Chord.get(chordString).tonic
        const arpeggioPositions = arpeggioMap[chordTypeSymbol]
        let tonicFretPosition
        fretBoardMap[ 6 - string ].find(function(note,index){
            var pattern=new RegExp( `(${chordTonic})[012345678]`,"g");
            if(note.match(pattern)){
                tonicFretPosition = index;
                return true;
            }else{
                return false;
            }
        });
        setInitialFret(tonicFretPosition)
        const transposedArpeggioPositions = arpeggioPositions.map( subarray => subarray.map( position => position + tonicFretPosition ))
        const arpeggioFretboardMapped = fretBoardMap.map( (stringArray, stringIndex) => stringArray.map( (note, fretIndex) => {
            return transposedArpeggioPositions[stringIndex].includes(fretIndex) ? note : null
          }))
        arpeggioFretboardMapped =  arpeggioFretboardMapped.map(  (stringArray) => stringArray.filter( (note, fretIndex) => { return fretIndex >= tonicFretPosition }))
        setNotes(arpeggioFretboardMapped.reverse())

      }

    }, [chordString])


    return (
        <div>
          <FretboardRenderer notes = {notes} initialFret={initialFret} />
        </div>
    )
}
