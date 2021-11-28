import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import { Chord } from '@tonaljs/tonal'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/ChordFilter'

export const getStaticProps = async () => {

  const rest = await fetch('http://localhost:1337/chords?note.flat=false');
  const data = await rest.json();

  return {
    props : {
      chords : data
    }
  }

}

export default function Home({ chords }) {

  const [currentChord, setCurrentChord] = useState(null);
  const [includedChords, setIncludedChords] = useState(chords);

  const [chordName, setChordName] = useState('-');
  const [chordSymbol, setChordSymbol] = useState("");
  const [chordNotes, setChordNotes] = useState("");
  const [chordIntervals, setChordIntervals] = useState("");

  const [playLoop, setPlayLoop] = useState(false);

  const generateNextChord = () =>{
    console.log(includedChords)
    let newChord;

    do{
      const activeChords = includedChords.filter( chord => chord.active == true);
      console.log( activeChords )
      const randomPosition = Math.floor(Math.random() * activeChords.length)
      newChord = activeChords[randomPosition];
    }
    while( newChord.id === currentChord?.id)

    const tonalChord =  Chord.get( newChord.note.symbol + newChord.chord_type.symbol )
   
    setCurrentChord(newChord)
    setChordSymbol(tonalChord.symbol)
    setChordName(tonalChord.name)
    setChordIntervals(tonalChord.intervals.join(' - '))
    setChordNotes(tonalChord.notes.join(' - '))
  }

  const updateChords = ( newChords ) =>{
    setIncludedChords( newChords )
  }
  

  useEffect(() => {
    
    if (!playLoop) {
      setCurrentChord(null);
      setChordName('-');
      setChordSymbol("");
      setChordNotes("");
      setChordIntervals("");
    }
    else{
      generateNextChord()
    }
    

  }, [playLoop, includedChords])

  return (
    <>
    
    <ChordFilter chords={ chords } callback = { updateChords } />

    <div className={styles.currentChordContainer}>
      <h1 className={styles.chordSymbol}>{chordSymbol}</h1>
      <h2 className={styles.chordName}>{chordName}</h2>
      <h3 className={styles.chordNotes}>{chordNotes}</h3>
      <h3 className={styles.chordIntervals}>{chordIntervals}</h3>
    </div>

    
    

    <button className={styles.btn} onClick={ generateNextChord }>Next</button>
    <div className={styles.loopButtons}>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(false) }}>Stop Loop</button>
    </div>

    <ChordPlayer chordString={`${chordSymbol}`}/> 
    <LoopFunction callback={ generateNextChord } delay={2000} isPlaying={playLoop}/>
    

    </>
  )
}
