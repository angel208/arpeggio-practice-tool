import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/ChordFilter'
import {getChordList} from '../utils/chordUtils'
import ArpeggioDiagram from '../components/ArpeggioDiagram'

export const getStaticProps = async () => {

  const data = getChordList(false)

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

    let newChord;

    do{
      const activeChords = includedChords.filter( chord => chord.active == true);
      const randomPosition = Math.floor(Math.random() * activeChords.length)
      newChord = activeChords[randomPosition];
    }
    while( newChord.symbol === currentChord?.symbol)
   
    setCurrentChord(newChord)
    setChordSymbol(newChord.symbol)
    setChordName(newChord.name)
    setChordIntervals(newChord.intervals.join(' - '))
    setChordNotes(newChord.notes.join(' - '))

  }

  const updateChords = ( chordList ) =>{
    setIncludedChords( chordList )
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


    <ChordFilter chords={ includedChords } callback = { updateChords } />


    <div className={styles.currentChordContainer}>
      <h1 className={styles.chordSymbol}>{chordSymbol}</h1>
      <h2 className={styles.chordName}>{chordName}</h2>
      <h3 className={styles.chordNotes}>{chordNotes}</h3>
      <h3 className={styles.chordIntervals}>{chordIntervals}</h3>
    </div>

    <ArpeggioDiagram/>

    <ChordPlayer chordString={`${chordSymbol}`}/> 
    <LoopFunction callback={ generateNextChord } delay={2000} isPlaying={playLoop}/>

    <button className={styles.btn} onClick={ generateNextChord }>Next</button>
    <div className={styles.loopButtons}>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
      <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(false) }}>Stop Loop</button>
    </div>

   
    

    </>
  )
}
