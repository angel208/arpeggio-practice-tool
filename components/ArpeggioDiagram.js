import React from 'react'
import { useEffect, useState } from 'react';
import FretboardRenderer from './Renderers/FretboardRenderer';
import { Chord } from '@tonaljs/tonal';

export default function ArpeggioDiagram( { chordString } ) {

    const arpeggioMap = {
      'maj7' : [ 's6f1', 's6f5', 's5f1', 's5f5', 's4f3', 's3f2', 's3f3', 's2f3', 's1f1', 's1f5'],
      '7' :    [ 's6f1', 's6f4', 's5f1', 's5f5', 's4f3', 's3f1', 's3f3', 's2f3', 's1f1', 's1f4' ],
      'm7' :   [ 's6f1', 's6f4', 's5f1', 's5f4', 's4f3', 's3f1', 's3f3', 's2f2', 's1f1', 's1f4' ],
      'm7b5' : [ 's6f1', 's6f5', 's5f2', 's5f5', 's4f3', 's3f2', 's3f4', 's2f3', 's1f1', 's1f5' ],
    }
    
    const [notes, setNotes] = useState([])

    useEffect(() => {
       const chordTypeSymbol = Chord.get( chordString ).aliases[0]
       setNotes(arpeggioMap[chordTypeSymbol])
    }, [chordString])

    return (
        <div>
          <FretboardRenderer notes = {notes}/>
        </div>
    )
}
