import { useEffect, useState } from 'react';
import { Chord, transpose, note } from '@tonaljs/tonal'
import { useHowl, Play } from 'rehowl'
import mp3 from '../assets/pianosprite.mp3'

const initialOctave = '3';
const lenghtOfNote = 2400;
const C1Position = 24;
const C7Position = 96;

function getChordNotes( chordString ){
    console.log(chordString)
    let intervals =  Chord.get(chordString).intervals
    let root =  Chord.get(chordString).tonic
    let rootWithOctave = root + initialOctave
    let notes = intervals.map( val => { return transpose( rootWithOctave , val )} ) 
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

    const [chordNotes, setChordNotes] = useState([])
    const [soundSequence, setSoundSequence] = useState([])
    const [playing, setPlaying] = useState([])
    const spriteDigits = generateIndexes();

    useEffect(() => {
        console.log("entered " + chordString.chordString)
        setChordNotes( getChordNotes(chordString.chordString) )
        let now = Date.now();
        let newSoundSquence = chordNotes.map( (chordNote, index) => ({ sprite: note(chordNote).midi, time: (now + index) }) )
        console.log(newSoundSquence)
        setSoundSequence( newSoundSquence )
    }, [chordString]);

    const { howl, state } = useHowl({ 
        src: mp3,
        sprite: spriteDigits
     })

    return  (
        <>
            { 
                
                soundSequence.map( ({ sprite, time }) => (
                    
                    <Play key={time} howl={howl} sprite={`${sprite}`} volume={0.05}  ></Play>
               
                ) ) 
            }
           
        </>
    ) 
}
