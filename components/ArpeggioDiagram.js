import React from 'react'
import { useEffect, useState } from 'react';
import FretboardRenderer from './Renderers/FretboardRenderer';
import { Chord } from '@tonaljs/tonal';
import { getArpegioFirstNoteFret, getArpeggioNotesMappedInFretboard} from '../utils/arpeggioutils';
const arpeggioMap = require('../data/arpeggioShapes.json');



export default function ArpeggioDiagram( { chordString, string = 6, finger = 1 } ) {

    const [fretboard, setFretboard] = useState([])
    const [initialFret, setInitialFret] = useState(0)

 
    useEffect(() => {
      if( chordString ){

        const chordTypeSymbol = Chord.get( chordString ).aliases[0]
        const arpeggioShape = arpeggioMap[chordTypeSymbol][finger][string]['shape']
        const arpeggioFirstNoteFret = getArpegioFirstNoteFret( chordString, string, finger )
        const fretboardWithArpeggioNotes = getArpeggioNotesMappedInFretboard({ chordString: chordString, arpeggioShape: arpeggioShape, startingFret : arpeggioFirstNoteFret, showIntervals : true})

        setInitialFret(arpeggioFirstNoteFret)
        setFretboard(fretboardWithArpeggioNotes)

      }
      else{
        setFretboard([])
      }

    }, [chordString])


    return (
        <div>
          <FretboardRenderer initialFret={initialFret} fretBoardMap={fretboard}  />
        </div>
    )
}
