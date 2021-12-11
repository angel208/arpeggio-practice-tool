import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/ChordFilter'
import {getChordList} from '../utils/chordUtils'
import ArpeggioDiagram from '../components/ArpeggioDiagram'
import useStore from '../utils/hooks/useStore'

export const getStaticProps = async () => {

  const data = getChordList(true)

  return {
    props : {
      chords : data
    }
  }

}

export default function Home({ chords }) {

  const [currentChord, setCurrentChord] = useState(null);
  
  const includedChords = useStore(state => state.includedChords)
  const setIncludedChords = useStore(state => state.setIncludedChords)  

  const [playLoop, setPlayLoop] = useState(false);
  const [playBack, setPlayBack] = useState(false);

  const generateNextChord = () =>{

    let newChord;

    do{
      const activeChords = includedChords.filter( chord => chord.active == true);
      const randomPosition = Math.floor(Math.random() * activeChords.length)
      newChord = activeChords[randomPosition];
    }
    while( newChord.symbol === currentChord?.symbol)
   
    setCurrentChord(newChord)

  }


  const replayChord = () =>{
    setPlayBack(true)
  }

  
  useEffect(() => {
    setIncludedChords(chords)
  }, [])

  useEffect(() => {
    
    if (!playLoop) {
      setCurrentChord(null);
    }
    else{
      generateNextChord()
    }
 
  }, [playLoop, includedChords])

  useEffect(() => {
    setPlayBack(false)
  }, [playBack])

  return (
    <div className={styles.container}>
      
      <div>
        <h1 className={styles.pageTitle}>Arpeggio Practice</h1>
        <ChordFilter/>
      </div>


      <div className={styles.chordPlayer}>

        <div className={styles.currentChordContainer}>
          <h1 className={styles.chordSymbol}>{currentChord?.symbol }</h1>
          <h2 className={styles.chordName}>{currentChord?.name ? currentChord?.name : "-"}</h2>
          <h3 className={styles.chordNotes}>{currentChord?.intervals.join(' - ')}</h3>
          <h3 className={styles.chordIntervals}>{currentChord?.notes.join(' - ')}</h3>
        </div>

        <ArpeggioDiagram chordString={currentChord?.symbol}/>
        <ChordPlayer chordString={currentChord?.symbol}  playback={playBack} noteCount={7} noteDelay={150}/> 
        
        <LoopFunction callback={ generateNextChord } delay={5000} isPlaying={playLoop}/>

        
        <div className={styles.loopButtons}>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ replayChord  }>Replay</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ generateNextChord }>Next</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(false) }}>Stop Loop</button>
        </div>

      </div>

    </div>
  )
}
