import create from 'zustand'

const useStore = create(set => ({
    includedChords: [],
    setIncludedChords1: ( chords ) => set({ includedChords: chords }),
    includeChords: (chordsToBeIncluded) => set( state => ({includedChords: includeChords( state.includedChords , chordsToBeIncluded)})),
    removeChords: (chordsToBeRemoved) => set( state => ({includedChords: removeChords( state.includedChords , chordsToBeRemoved)})),
  }))


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