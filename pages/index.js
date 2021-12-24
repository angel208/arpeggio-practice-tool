import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/ChordFilter'
import {getChordList, getChordNotes} from '../utils/chordUtils'
import ArpeggioDiagram from '../components/ArpeggioDiagram'
import useStore from '../utils/hooks/useStore'
import { MdOutlineLibraryMusic,  MdOutlineMusicVideo, MdVolumeUp, MdVolumeOff} from "react-icons/md";
import { getArpegioOctave } from '../utils/arpeggioutils'
import {Heading, Text, Flex, VStack} from '@chakra-ui/react'

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
      setCurrentArpeggio(null)
    }
    else{
      generateNextChord()
    }
 
  }, [playLoop, includedChords])

  useEffect(() => {
    setPlayBack(false)
  }, [playBack])

  return (
    <Flex h={{base:'auto', md:'auto'}} pt={[0, 10, 16]}  direction={{base:'column-reverse', md:'row'}}>

      <VStack w={{base:'full', md:'60%'}} h="full" p={10} pt={0} spacing={0} alignItems="flex-start">
        <Heading size="lg" fontWeight='medium'>Arpeggio Practice</Heading>
        <ChordFilter/>
      </VStack>


      <VStack w={{base:'full', md:'40%'}} h="fit-content" p={10} spacing={5} boxShadow='md' borderRadius='2xl' background='white'>

        <VStack spacing={0}>
          <Heading h='45px' fontSize='3xl' fontWeight='bold' >{currentChord?.symbol }</Heading>
          <Text h='40px' fontSize='xl' pb={12}>{ (currentArpeggio?.string.name ? currentArpeggio?.string.name + " - "  : "" ) + (currentArpeggio?.finger.name ? currentArpeggio?.finger.name : "")}</Text>
          <Text h='35px'>{currentChord?.name ? currentChord?.name : "-"}</Text>
          <Text h='35px'>{currentChord?.intervals.join(' - ')}</Text>
          <Text h='35px'>{getChordNotes(currentChord?.symbol).join(' - ')}</Text>
        </VStack>

        <ArpeggioDiagram chordString={currentChord?.symbol} string ={currentArpeggio?.string.number} finger = {currentArpeggio?.finger.number} />
        <ChordPlayer chordString={currentChord?.symbol}
                     initialOctave = {getArpegioOctave(currentChord?.symbol, currentArpeggio?.string.number, currentArpeggio?.finger.number)  }
                     playback={playBack} 
                     noteCount={7} 
                     muted={muted} 
                     arpeggiated={arpeggiated}/> 
        
        <LoopFunction callback={ generateNextChord } delay={8000} isPlaying={playLoop}/>

        
        <div className={styles.loopButtons}>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ replayChord  }>Replay</button>
          <button className={`${styles.btn} ${styles.inline}`} onClick={ generateNextChord }>Next</button>
          <br></br>
          <button className={`${styles.btn} ${styles.inline} ${styles.secondary}`} onClick={ () => { setPlayLoop(true) }}>Start Loop</button>
          <button className={`${styles.btn} ${styles.inline} ${styles.secondary}`} onClick={ () => { setPlayLoop(false) }}>Stop Loop</button>
        </div>

        <div className={styles.playerOptionMenu}>
          <button className={styles.playerOption} onClick={ () => setMuted(!muted)  }>
          { muted ? <MdVolumeOff size={20} />  : <MdVolumeUp size={20} />}
          </button>
          <button className={styles.playerOption} onClick={ () => setArpeggiated(!arpeggiated)  }>
            { arpeggiated ? <MdOutlineMusicVideo size={20}/> : <MdOutlineLibraryMusic size={20} />}
          </button>
        </div>
        
      </VStack>

    </Flex>
  )
}
