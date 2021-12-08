import { useState } from 'react';
import { Chord, transpose, note } from '@tonaljs/tonal'
import { useHowl, Play } from 'rehowl'
import mp3 from '../assets/pianosprite.mp3'
import PlayDelayed from './PlayDelayed';
import useUpdateEffect from '../utils/hooks/useUpdateEffect';

const initialOctave = 2;
const lenghtOfNote = 2400;
const C1Position = 24;
const C7Position = 96;
const volume = 0.05;

function getChordNotes(chordString, noteCount) {
    let intervals = Chord.get(chordString).intervals
    let root = Chord.get(chordString).tonic

    let notes = []
    for (let i = 0, octave = initialOctave; i < noteCount; i++) {

        let intervalIndex = i % intervals.length;

        if (intervalIndex == 0 && i != 0)
            octave++

        let rootWithOctave = root + octave
        let currentInterval = intervals[intervalIndex]
        notes.push(transpose(rootWithOctave, currentInterval))
    }
    return notes
}

let generateIndexes = () => {

    let spriteDigits = {}
    let timeIndex = 0;

    for (let i = C1Position; i <= C7Position; i++) {
        spriteDigits[i] = [timeIndex, lenghtOfNote];
        timeIndex += lenghtOfNote;
    }

    return spriteDigits;

}

export default function ChordPlayer({chordString, noteCount = 4, noteDelay = 75, playBack}) {

    const [chordMIDISequence, setChordMIDISequence] = useState([])
    const spriteDigits = generateIndexes();
    const { howl } = useHowl({
        src: mp3,
        sprite: spriteDigits
    })

    useUpdateEffect(() => {
        
        if (!chordString || chordString == ' ') {console.log("no entro a useeffect chordplayer"); return}

        console.log({msg: "entra a useeffect chordplayer", chordString: chordString})
        let chordNotes = getChordNotes(chordString, noteCount)
    
        let now = Date.now();
        let newMIDISquence = chordNotes.map((chordNote, index) => ({ sprite: note(chordNote).midi, time: (now + index) }))

        setChordMIDISequence(newMIDISquence)
        
      }, [chordString, playBack]);


    return (
        <>
            {
                chordMIDISequence.map(({ sprite, time }, index) => (
                    <PlayDelayed key={time} howl={howl} sprite={`${sprite}`} volume={volume} delayed={true} delay={index * noteDelay}  ></PlayDelayed>
                ))
            }

        </>
    )
}
