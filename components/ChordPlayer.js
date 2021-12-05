import { useEffect, useState } from 'react';
import { Chord, transpose, note } from '@tonaljs/tonal'
import { useHowl, Play } from 'rehowl'
import mp3 from '../assets/pianosprite.mp3'
import PlayDelayed from './PlayDelayed';

const initialOctave = '2';
const lenghtOfNote = 2400;
const C1Position = 24;
const C7Position = 96;
const volume = 0.05;
const noteDelay = 75;

function getChordNotes( chordString ){
    console.log(chordString)
    let intervals =  Chord.get(chordString).intervals
    let root =  Chord.get(chordString).tonic
    let rootWithOctave = root + initialOctave
    let notes = intervals.map( val => { return transpose( rootWithOctave , val )} ) 
    console.log("1" + notes)
    return notes
 }

 let generateIndexes = () => {

    let spriteDigits = {}
    let timeIndex = 0;

    for ( let i = C1Position; i <= C7Position;  i++ ){
        spriteDigits[i] = [ timeIndex, lenghtOfNote ];
        timeIndex += lenghtOfNote;
    }

    return spriteDigits;

 }

export default function ChordPlayer( chordString ) {

    const [chordMIDISequence, setChordMIDISequence] = useState([])
    const spriteDigits = generateIndexes();   
    const { howl, state } = useHowl({ 
        src: mp3,
        sprite: spriteDigits
     })

    useEffect(() => {

        let chordNotes = getChordNotes(chordString.chordString) 
        
        let now = Date.now();
        let newMIDISquence = chordNotes.map( (chordNote, index) => ({ sprite: note(chordNote).midi, time: (now + index) }) )
        console.log(newMIDISquence)

        setChordMIDISequence( newMIDISquence )

    }, [chordString]);


    return  (
        <>
            { 
                chordMIDISequence.map( ({ sprite, time }, index) => (
                    <PlayDelayed key={time} howl={howl} sprite={`${sprite}`} volume={volume} delayed={true} delay={ index * noteDelay }  ></PlayDelayed>
                ) ) 
            }
           
        </>
    ) 
}
