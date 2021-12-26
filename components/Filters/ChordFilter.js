import React from 'react'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'
import ToggleSwitch from './ToggleSwitch'
import useStore from '../../utils/hooks/useStore'
import { Note } from '@tonaljs/tonal'
import { Grid, Box, VStack, Heading} from '@chakra-ui/react'

export default function ChordFilter( ) {

    const includedArpeggioStrings = useStore(state => state.includedArpeggioStrings)
    const toggleArpeggioString = useStore(state => state.toggleArpeggioString)

    const includedArpeggioFingers = useStore(state => state.includedArpeggioFingers)
    const toggleArpeggioFinger = useStore(state => state.toggleArpeggioFinger)

    const includedChords = useStore(state => state.includedChords)
    const includeChords = useStore(state => state.includeChords)  
    const removeChords = useStore(state => state.removeChords)
      

    const [flats, setFlats] = useState(true)
    const [chordTypes, setChordTypes] = useState(
        Object.fromEntries([ 'maj7', 'm7', '7', 'm7b5' ].map( chord => { return [chord, true]}))
    );

    function toggleFlats( flats) {

        const flatChordList = includedChords.filter( chord => ( Note.get( chord.tonic ).alt != 0 ) )

        if(flats){
            //only flats that are of the active chordtypes
            const flatChordsToAdd = flatChordList.filter( chord => chordTypes[chord.aliases[0]] == true  )
            includeChords(flatChordsToAdd)
        }
        else
            removeChords(flatChordList)

        setFlats(flats)
    }

    function toggleChord( chord ){    
        if( chord.active ){
            removeChords([chord])
        } 
        else
            includeChords([chord])
    }

    function toggleChordType( chordTypeSymbol ){ 

        //get all chords by certain chordtype
        const chordListByChordType = includedChords.filter( chord => chord.aliases.includes(chordTypeSymbol)  )

        const chordTypeIsActive = chordTypes[chordTypeSymbol]

        if(chordTypeIsActive)
            removeChords(chordListByChordType)
        else{
            if( flats == false )
                //remove flats
                chordListByChordType = chordListByChordType.filter( chord => Note.get( chord.tonic ).alt == 0  )

            includeChords(chordListByChordType)
        }
            

        let newChordTypes = chordTypes
        newChordTypes[chordTypeSymbol] = !chordTypeIsActive
        setChordTypes(newChordTypes)

    }

    useEffect(() => {
        console.log("----")
        console.log({includedArpeggioStrings})
        console.log({includedArpeggioFingers})
    }, [includedArpeggioStrings, includedArpeggioFingers])


    return (
        <VStack  alignItems={'left'} spacing={2} mt={'0px'} w='100%' px={5} pl={0} > 

            <Box>
                <Heading size={'md'} pb={1}>Chord Type Filters</Heading>
                <Grid templateColumns={'repeat(5, 1fr)'} mt={4}> 
                    {Object.keys(chordTypes).map( chordType => (
                        <ToggleSwitch key={chordType} name={chordType} checked={chordTypes[chordType]} callBack={ () => {toggleChordType(chordType)} } />
                    )) }
                </Grid>
            </Box>

            <Box>
                <Heading size={'md'} pb={1}>Apreggio Filters</Heading>
                <Grid templateColumns={'repeat(5, 1fr)'} mt={4}>
                    {includedArpeggioStrings.map( arpeggioString => (
                        <ToggleSwitch key={arpeggioString.number} name={arpeggioString.name} checked={arpeggioString.active} callBack={ () => {toggleArpeggioString(arpeggioString.number, !arpeggioString.active)} } />
                    )) }
                    {includedArpeggioFingers.map( arpeggioFinger => (
                        <ToggleSwitch key={arpeggioFinger.number} name={arpeggioFinger.name} checked={arpeggioFinger.active} callBack={ () => {toggleArpeggioFinger(arpeggioFinger.number, !arpeggioFinger.active)} } />
                    )) }
                </Grid>
            </Box>
            
            <Box>
                <Heading size={'md'} pb={1}>Other Filters</Heading>
                <Grid templateColumns={'repeat(5, 1fr)'} mt={4}>
                    <ToggleSwitch name={`flats`} checked={flats} callBack={ () => {toggleFlats(!flats)} } />
                </Grid>
            </Box>

            <Heading size={'lg'} pt={10}>Included Chords</Heading>
            <Grid templateColumns={'repeat(auto-fill, minmax(4.5rem, 1fr))'}>
            
            { 
                includedChords.map( chord => (
    
                        <ChordButton key={chord.symbol} chord = { chord } active={ chord.active } callback={ toggleChord }/>

                )) 
            }
            
            </Grid>
            

        </VStack>
    )
}
