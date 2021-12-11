import React from 'react'
import styles from '../../styles/FretBoard.module.css'

export default function Note( {text, root} ) {
    return (
        <div className={`${styles.note} ${ root ? styles.root : " "}` }>
            { text != null ? <span>{text}</span> : ""}
        </div>
    )
}
