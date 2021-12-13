import React from 'react'
import styles from '../styles/ChordFilter.module.css'
import { useState, useEffect} from 'react'
import ChordButton from './ChordButton'
import ToggleSwitch from './Filters/ToggleSwitch'
import useStore from '../utils/hooks/useStore'
import { Note } from '@tonaljs/tonal'

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
        Object.fromEntries([ 'maj7', 'm7', '7' ].map( chord => { return [chord, true]}))
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
        <div>

           

            <div className={styles.filterSection}>
                <h3>Chord Types</h3>
                <div className={styles.filterGrid}>
                    {Object.keys(chordTypes).map( chordType => (
                        <ToggleSwitch key={chordType} name={chordType} checked={chordTypes[chordType]} callBack={ () => {toggleChordType(chordType)} } />
                    )) }
                </div>
            </div>

            <div className={styles.filterSection}>
                <h3>Apreggio Filters</h3>
                <div className={styles.filterGrid}>
                    {includedArpeggioStrings.map( arpeggioString => (
                        <ToggleSwitch key={arpeggioString.number} name={arpeggioString.name} checked={arpeggioString.active} callBack={ () => {toggleArpeggioString(arpeggioString.number, !arpeggioString.active)} } />
                    )) }
                    {includedArpeggioFingers.map( arpeggioFinger => (
                        <ToggleSwitch key={arpeggioFinger.number} name={arpeggioFinger.name} checked={arpeggioFinger.active} callBack={ () => {toggleArpeggioFinger(arpeggioFinger.number, !arpeggioFinger.active)} } />
                    )) }
                </div>
            </div>
            
            <div className={styles.filterSection}>
                <h3>Other Filters</h3>
                <div className={styles.filterGrid}>
                    <ToggleSwitch name={`flats`} checked={flats} callBack={ () => {toggleFlats(!flats)} } />
                </div>
            </div>

            <h3 className={styles.title}>Included Chords</h3>
            <div className={styles.notesGrid}>
            
            { 
                includedChords.map( chord => (
    
                        <ChordButton key={chord.symbol} chord = { chord } active={ chord.active } callback={ toggleChord }/>

                )) 
            }
            
            </div>
            

        </div>
    )
}
