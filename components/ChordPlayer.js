import { useState, useEffect} from 'react';
import { Chord, transpose, note } from '@tonaljs/tonal'
import { useHowl, Play } from 'rehowl'
import mp3 from '../assets/pianosprite.mp3'
import PlayDelayed from './PlayDelayed';
import useUpdateEffect from '../utils/hooks/useUpdateEffect';


const lenghtOfNote = 2400;
const C1Position = 24;
const C7Position = 96;
const volume = 0.03;
const noteDelay = 150;

function getChordNotes(chordString, noteCount, initialOctave) {
    let intervals = Chord.get(chordString).intervals
    let root = Chord.get(chordString).tonic

    let notes = []
    for (let i = 0, octave = initialOctave - 1; i < noteCount; i++) {

        let intervalIndex = i % intervals.length;

        if (intervalIndex == 0 && i != 0)
            octave++

        let rootWithOctave = root + octave
        let currentInterval = intervals[intervalIndex]
        notes.push(transpose(rootWithOctave, currentInterval))
    }
    console.log({notes})
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

export default function ChordPlayer({chordString, initialOctave = 2, noteCount = 4, playback, muted=false, arpeggiated=true}) {

    const [chordMIDISequence, setChordMIDISequence] = useState([])
    const spriteDigits = generateIndexes();
    const { howl } = useHowl({
        src: mp3,
        sprite: spriteDigits
    })

    useUpdateEffect(() => {
        
        if (!chordString || chordString == ' ') {console.log("no entro a useeffect chordplayer"); return}


        console.log({msg: "entra a useeffect chordplayer", chordString: chordString})
        let chordNotes = getChordNotes(chordString, noteCount, initialOctave)
    
        let now = Date.now();
        let newMIDISquence = chordNotes.map((chordNote, index) => ({ sprite: note(chordNote).midi, time: (now + index) }))

        setChordMIDISequence(newMIDISquence)
        
      }, [chordString, playback]);



    return (
        <>
            {
                muted ? "" :
                chordMIDISequence.map(({ sprite, time }, index) => (
                    <PlayDelayed key={time} howl={howl} sprite={`${sprite}`} volume={volume} delayed={true} delay={ arpeggiated ? (index * noteDelay) : (index * 25)}  ></PlayDelayed>
                ))
            }

        </>
    )
}
