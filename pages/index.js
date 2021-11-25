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

  const [currentChord, setCurrentChord] = useState(chords[0]);

  const generateNextChord = () =>{
    const randomPosition = Math.floor(Math.random() * chords.length)
    setCurrentChord(chords[randomPosition])
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
      <h1>{currentChord.note.symbol + currentChord.chord_type.symbol}</h1>
      <h2>{currentChord.note.name +" "+ currentChord.chord_type.name}</h2>
    </div>

    <ChordPlayer chordString={`${currentChord.note.symbol + currentChord.chord_type.symbol}`}/> 

    <button className={styles.btn} onClick={ generateNextChord }>Next</button>

    </>
  )
}
