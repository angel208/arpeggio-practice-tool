import styles from '../styles/Home.module.css'
import { useState } from 'react'
import ChordPlayer from '../components/ChordPlayer'

export const getStaticProps = async () => {

  const rest = await fetch('http://localhost:1337/chords?note.flat=false');
  const data = await rest.json();

  return {
    props : {
      chords : data
    }
  }

}

export default function Home({ chords }) {

  const [currentChord, setCurrentChord] = useState(null);
  const [chordName, setChordName] = useState('-');
  const [chordSymbol, setChordSymbol] = useState("");

  const generateNextChord = () =>{

    let newChord;

    do{
      const randomPosition = Math.floor(Math.random() * chords.length)
      newChord = chords[randomPosition];
    }
    while( newChord === currentChord)
   
    setCurrentChord(newChord)
    setChordSymbol(newChord.note.symbol + newChord.chord_type.symbol)
    setChordName(newChord.note.name + " " + newChord.chord_type.name)

  }


  return (
    <>
    <h1 className={styles.title}>Included Chords</h1>
    <div className={styles.notesGrid}>
      { 
        chords.map( chord => (
          <div key ={ chord.id } >
            <a className={styles.single}>
              <h3>
                {  chord.note.symbol + chord.chord_type.symbol }
              </h3>
            </a>

          </div>
        )) 
      }
    </div>

    <div className={styles.currentChordContainer}>
      <h1>{chordSymbol}</h1>
      <h2>{chordName}</h2>
    </div>

    <ChordPlayer chordString={`${chordSymbol}`}/> 

    <button className={styles.btn} onClick={ generateNextChord }>Next</button>

    </>
  )
}
