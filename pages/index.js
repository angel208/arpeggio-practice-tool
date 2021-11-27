import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import { Chord } from '@tonaljs/tonal'
import LoopFunction from '../components/LoopFunction'

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
  const [chordName, setChordName] = useState('-');
  const [chordSymbol, setChordSymbol] = useState("");
  const [chordNotes, setChordNotes] = useState("");
  const [chordIntervals, setChordIntervals] = useState("");

  const [playLoop, setPlayLoop] = useState(false);

  const generateNextChord = () =>{

    let newChord;

    do{
      const randomPosition = Math.floor(Math.random() * chords.length)
      newChord = chords[randomPosition];
    }
    while( newChord === currentChord)

    const tonalChord =  Chord.get( newChord.note.symbol + newChord.chord_type.symbol )
   
    setCurrentChord(newChord)
    setChordSymbol(tonalChord.symbol)
    setChordName(tonalChord.name)
    setChordIntervals(tonalChord.intervals.join(' - '))
    setChordNotes(tonalChord.notes.join(' - '))
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
    

  }, [playLoop])

  return (
    <>
    <h1 className={styles.title}>Included Chords</h1>
    <div className={styles.notesGrid}>
      { 
        chords.map( chord => (
          <div key ={ chord.id } >
            <a className={styles.single}>
              <h3>
                {  chord.note.symbol + chord.chord_type.symbol }
              </h3>
            </a>

          </div>
        )) 
      }
    </div>

    <div className={styles.currentChordContainer}>
      <h1 className={styles.chordSymbol}>{chordSymbol}</h1>
      <h2 className={styles.chordName}>{chordName}</h2>
      <h3 className={styles.chordNotes}>{chordNotes}</h3>
      <h3 className={styles.chordIntervals}>{chordIntervals}</h3>
    </div>

    
    

    <button className={styles.btn} onClick={ generateNextChord }>Next</button>
    <div className={styles.loopButtons}>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { console.log("stop"); setPlayLoop(false) }}>Stop Loop</button>
    </div>

    <ChordPlayer chordString={`${chordSymbol}`}/> 
    <LoopFunction callback={ generateNextChord } delay={2000} isPlaying={playLoop}/>
    

    </>
  )
}
