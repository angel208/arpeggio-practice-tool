import { useEffect, useState } from 'react';
import { Chord, transpose } from '@tonaljs/tonal'
import { useHowl, Play } from 'rehowl'
import mp3 from '../../assets/pianosprite.mp3'

const initialOctave = '4';
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

const usePlayChord = ( chordString ) =>{
    
    
    const [chordNotes, setChordNotes] = useState([])
    const spriteDigits = generateIndexes();

    useEffect(() => {
        console.log("Asd" + chordString)
        setChordNotes( getChordNotes(chordString) )
    }, [chordString]);

    const { howl, state } = useHowl({ 
        src: mp3,
        sprite: spriteDigits
     })

    return  <Play howl={howl} sprite='24' volume={0.05} />  

}

export default usePlayChord