import create from 'zustand'

const useStore = create(set => ({
    includedChords: [],
    includedArpeggioStrings: [{ name: "6th String", number: 6, active: true},{ name: "5th String", number: 5, active: true}],
    includedArpeggioFingers: [{ name: "index", number: 1, active: true},{ name: "middle", number: 2, active: true},{ name: "anular", number: 4, active: true}],
    setIncludedChords: ( chords ) => set({ includedChords: chords }),
    includeChords: (chordsToBeIncluded) => set( state => ({includedChords: includeChords( state.includedChords , chordsToBeIncluded)})),
    removeChords: (chordsToBeRemoved) => set( state => ({includedChords: removeChords( state.includedChords , chordsToBeRemoved)})),
    toggleArpeggioString: (stringNumber, active) => set( state => ({includedArpeggioStrings: toggleArpeggioString( state.includedArpeggioStrings , stringNumber, active)})),
    toggleArpeggioFinger: (fingerNumber, active) => set( state => ({includedArpeggioFingers: toggleArpeggioFinger( state.includedArpeggioFingers , fingerNumber, active)})), 
}))

const toggleArpeggioString = (includedArpeggioStrings, stringNumber, active) => {

    let newList = [...includedArpeggioStrings]
    let stringToToggle = includedArpeggioStrings.find( stringObject => { return stringObject.number == stringNumber  }) 
    stringToToggle.active =  active
    
    return newList
}

const toggleArpeggioFinger = (includedArpeggioFingers, fingerNumber, active) => {

    let newList = [...includedArpeggioFingers]
    let fingerToToggle = includedArpeggioFingers.find( fingerObject => { return fingerObject.number == fingerNumber  }) 
    fingerToToggle.active =  active
    
    return newList
}


const includeChords = (includedChords, chordsToBeIncluded) => {

    let newList = [...includedChords]
    console.log("entrando")
    console.log(newList)
    chordsToBeIncluded.forEach( chord => {
        let objIndex = newList.findIndex((item => item.symbol == chord.symbol));
        newList[objIndex].active = true
    })   
    
    return newList
}

const removeChords = (includedChords, chordsToBeRemoved) => {

    let newList = [...includedChords]

    chordsToBeRemoved.forEach( chord => {
        let objIndex = newList.findIndex((item => item.symbol == chord.symbol));
        console.log("removing")
        newList[objIndex].active = false
        console.log(newList)
    }) 

    return newList

}

export default useStore