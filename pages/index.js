import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {

  const rest = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await rest.json();

  return {
    props : {
      chordTypes : data
    }
  }

}

export default function Home({ chordTypes }) {
  return (
    <>
    <h1 className={styles.title}>holi</h1>
    <p>Irure amet et et pariatur irure aliqua laborum est sit in amet irure officia.</p>
    { 
      chordTypes.map( chordType => (
        <div key ={ chordType.id } >
          <a className={styles.single}>
            <h3>
              { chordType.name }
            </h3>
          </a>

        </div>
      )) 
    }
    <a className={styles.btn}>Play</a>

    </>
  )
}
