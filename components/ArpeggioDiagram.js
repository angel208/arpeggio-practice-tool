import React from 'react'
import { useEffect, useState } from 'react';
import FretboardRenderer from './Renderers/FretboardRenderer';
import { Chord, transpose, Note } from '@tonaljs/tonal';
import {getChordNotes} from '../utils/chordUtils'
import { getArpegioFirstNoteFret, getArpeggioNotesMappedInFretboard} from '../utils/arpeggioutils';
const arpeggioMap = require('../data/arpeggioShapes.json');

function getIntervals(chordString) {

  let intervals = Chord.get(chordString).intervals
  let notes = getChordNotes(chordString)
  let notesWithIntervals = intervals.map( (interval, intervalIndex) => { return { note: notes[intervalIndex] , interval: interval }  } )
  return notesWithIntervals
}


export default function ArpeggioDiagram( { chordString, string = 6, finger = 1 } ) {

    const [notes, setNotes] = useState([])
    const [intervalMap, setIntervalMap] = useState([])
    const [initialFret, setInitialFret] = useState(0)

 
    useEffect(() => {
      if( chordString ){
        const chordTypeSymbol = Chord.get( chordString ).aliases[0]
        const arpeggioShape = arpeggioMap[chordTypeSymbol][finger][string]['shape']
        const arpeggioFirstNoteFret = getArpegioFirstNoteFret( chordString, string, finger )
        const fretboardWithArpeggioNotes = getArpeggioNotesMappedInFretboard({ arpeggioShape: arpeggioShape, startingFret : arpeggioFirstNoteFret})
        
        setInitialFret(arpeggioFirstNoteFret)
        setNotes(fretboardWithArpeggioNotes)
        setIntervalMap(getIntervals(chordString))

      }
      else{
        setNotes([])
      }

    }, [chordString])


    return (
        <div>
          <FretboardRenderer initialFret={initialFret} notes={notes} showIntervals={true} intervalMap={intervalMap} />
        </div>
    )
}
