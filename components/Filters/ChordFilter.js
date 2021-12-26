import React from 'react'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'
import ToggleSwitch from './ToggleSwitch'
import useStore from '../../utils/hooks/useStore'
import { Note } from '@tonaljs/tonal'
import { Grid, Box, VStack, Heading, Tooltip } from '@chakra-ui/react'
import FilterTooltip from './FilterTooltip'


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
        <VStack  alignItems={'left'} spacing={2} mt={'0px'} w='100%' px={{base:0, md:5}} pl={0} > 

            <Box>
                <Heading size={'md'} pb={1} display={'inline-block'}>Chord Type Filters</Heading>
                <FilterTooltip text='Here you can select which chord types do you want to play.'/>
                <Grid templateColumns={{base:'repeat(4, 1fr)', md:'repeat(5, 1fr)'}} rowGap={5} alignItems={'center'}   mt={4}> 
                    {Object.keys(chordTypes).map( chordType => (
                        <ToggleSwitch key={chordType} name={chordType} checked={chordTypes[chordType]} callBack={ () => {toggleChordType(chordType)} } />
                    )) }
                </Grid>
            </Box>

            <Box>
                <Heading size={'md'} pb={1} display={'inline-block'}>Apreggio Filters</Heading>
                <FilterTooltip text='Here, you can select which strings do you want the root of the arpeggios to be in. You can also choose which fingers do you want to use to play the root of the arpeggios.'/>
                <Grid templateColumns={{base:'repeat(3, 1fr)', md:'repeat(5, 1fr)'}} rowGap={5}  alignItems={'center'}    mt={4}>
                    {includedArpeggioStrings.map( arpeggioString => (
                        <ToggleSwitch key={arpeggioString.number} name={arpeggioString.name} checked={arpeggioString.active} callBack={ () => {toggleArpeggioString(arpeggioString.number, !arpeggioString.active)} } />
                    )) }
                    {includedArpeggioFingers.map( arpeggioFinger => (
                        <ToggleSwitch key={arpeggioFinger.number} name={arpeggioFinger.name} checked={arpeggioFinger.active} callBack={ () => {toggleArpeggioFinger(arpeggioFinger.number, !arpeggioFinger.active)} } />
                    )) }
                </Grid>
            </Box>
            
            <Box>
                <Heading size={'md'} pb={1} display={'inline-block'}>Other Filters</Heading>
                <FilterTooltip text='Here you can apply other filters, things like exclude or include flat chords.'/>
                <Grid templateColumns={{base:'repeat(4, 1fr)', md:'repeat(5, 1fr)'}} alignItems={'center'}  rowGap={5} mt={4} >
                    <ToggleSwitch name={`flats`} checked={flats} callBack={ () => {toggleFlats(!flats)} } />
                </Grid>
            </Box>
            
            <Box>
                <Heading size={'lg'} pt={10} display={'inline-block'}>Included Chords</Heading>
                <FilterTooltip text='Here you can see which chords are selected to appear randomly in the arpeggio player. You can also select or unselect specific chords.'/>
                <Grid templateColumns={'repeat(auto-fill, minmax(4.5rem, 1fr))'}>
                
                    { 
                        includedChords.map( chord => (
            
                                <ChordButton key={chord.symbol} chord = { chord } active={ chord.active } callback={ toggleChord }/>

                        )) 
                    }
                
                </Grid>
            </Box>
            

        </VStack>
    )
}
