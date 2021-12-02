import React from 'react'
import styles from '../../styles/FretBoard.module.css'

export default function Note( {text} ) {
    return (
        <div className={styles.note}>
            { text != null ? <span>{text}</span> : ""}
        </div>
    )
}
