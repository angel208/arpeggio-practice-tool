import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/ChordFilter'
import {getChordList} from '../utils/chordUtils'
import ArpeggioDiagram from '../components/ArpeggioDiagram'
import useStore from '../utils/hooks/useStore'
import { MdOutlineLibraryMusic,  MdOutlineMusicVideo, MdVolumeUp, MdVolumeOff} from "react-icons/md";

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
  const [currentArpeggio, setCurrentArpeggio] = useState(null);
  
  const includedChords = useStore(state => state.includedChords)
  const setIncludedChords = useStore(state => state.setIncludedChords)
  
  const includedArpeggioFingers = useStore(state => state.includedArpeggioFingers)
  const includedArpeggioStrings = useStore(state => state.includedArpeggioStrings)

  const [playLoop, setPlayLoop] = useState(false);
  const [playBack, setPlayBack] = useState(false);

  const [muted, setMuted] = useState(false);
  const [arpeggiated, setArpeggiated] = useState(true);


  const generateNextChord = () =>{

    let newChord;

    do{
      const activeChords = includedChords.filter( chord => chord.active == true);
      const randomPosition = Math.floor(Math.random() * activeChords.length)
      newChord = activeChords[randomPosition];
    }
    while( newChord.symbol === currentChord?.symbol)

    const activeFingers = includedArpeggioFingers.filter( finger => finger.active == true)
    const newFinger = activeFingers[ Math.floor(Math.random() * activeFingers.length)]
    const activeStrings = includedArpeggioStrings.filter( string => string.active == true)
    const newString = activeStrings[ Math.floor(Math.random() * activeStrings.length)]

    setCurrentChord(newChord)
    setCurrentArpeggio({ string : newString, finger: newFinger})
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
          <h3 className={styles.arpeggioData}>{ (currentArpeggio?.string.name ? currentArpeggio?.string.name + " - "  : "" ) + (currentArpeggio?.finger.name ? currentArpeggio?.finger.name : "")}</h3>
        </div>

        <ArpeggioDiagram chordString={currentChord?.symbol} string ={currentArpeggio?.string.number} finger = {currentArpeggio?.finger.number} />
        <ChordPlayer chordString={currentChord?.symbol}  playback={playBack} noteCount={7} muted={muted} arpeggiated={arpeggiated}/> 
        
        <LoopFunction callback={ generateNextChord } delay={5000} isPlaying={playLoop}/>

        
        <div className={styles.loopButtons}>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ replayChord  }>Replay</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ generateNextChord }>Next</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ () => { setPlayLoop(false) }}>Stop Loop</button>
        </div>

        <div className={styles.playerOptionMenu}>
          <button className={styles.playerOption} onClick={ () => setMuted(!muted)  }>
          { muted ? <MdVolumeOff size={20} />  : <MdVolumeUp size={20} />}
          </button>
          <button className={styles.playerOption} onClick={ () => setArpeggiated(!arpeggiated)  }>
            { arpeggiated ? <MdOutlineMusicVideo size={20}/> : <MdOutlineLibraryMusic size={20} />}
          </button>
        </div>

      </div>

    </div>
  )
}
