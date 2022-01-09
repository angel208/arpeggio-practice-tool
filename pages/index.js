import { useState, useEffect} from 'react'
import ChordPlayer from '../components/ChordPlayer'
import LoopFunction from '../components/LoopFunction'
import ChordFilter from '../components/Filters/ChordFilter'
import {getChordList, getChordNotes} from '../utils/chordUtils'
import ArpeggioDiagram from '../components/ArpeggioDiagram'
import useStore from '../utils/hooks/useStore'
import { MdOutlineLibraryMusic,  MdOutlineMusicVideo, MdVolumeUp, MdVolumeOff} from "react-icons/md";
import { getArpegioOctave } from '../utils/arpeggioutils'
import {Heading, Text, Flex, VStack, Box, Button, HStack} from '@chakra-ui/react'
import PlayerSetting from '../components/Player/PlayerSetting'

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
        <Heading size="xl" fontWeight='medium' pt={0} pl={{base:'0', md:5}} >Arpeggio Practice</Heading>
        <ChordFilter/>
      </VStack>


      <VStack w={{base:'90%', md:'40%'}} h="fit-content" mx={5} mb={7} mt={{base:4, md: 0}} p={8} spacing={5} boxShadow='md' borderRadius='2xl' background='white'>

        <VStack spacing={0}>
          <Heading h='45px' fontSize='3xl' fontWeight='bold' pb={10} >{currentChord?.symbol }</Heading>
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

        
        <VStack spacing={4}>
          <HStack spacing={4}>
            <Button onClick={ replayChord  } w={'120px'}>Replay</Button>
            <Button onClick={ generateNextChord  } w={'120px'}>Next</Button>
          </HStack>
          <Button hidden={ playLoop } onClick={ () => { setPlayLoop(true) } } variant='secondary' w={'100%'}>Start Loop</Button>
          <Button hidden={ !playLoop } onClick={ () => { setPlayLoop(false) }  } variant='secondary' w={'100%'}>Stop Loop</Button>
        </VStack>

        <HStack pt={5} spacing={8}>
          <PlayerSetting onClick={() => setMuted(!muted)} stateVariable={muted} TrueIcon={MdVolumeOff} FalseIcon={MdVolumeUp}/>
          <PlayerSetting onClick={() => setArpeggiated(!arpeggiated)} stateVariable={arpeggiated} TrueIcon={MdOutlineMusicVideo} FalseIcon={MdOutlineLibraryMusic}/>
        </HStack>
        
      </VStack>

    </Flex>
  )
}
