import React from 'react'
import styles from "../../styles/ToggleSwitch.module.css"

export default function ToggleSwitch({name, checked, callBack, optionLabels = ["", ""], disabled=false}) {    

    return (
        <div>
            <p className={styles.label}>{name}</p>
            <div className={`${styles.toggleSwitch}`}>
                
                <input
                type="checkbox"
                className={styles.toggleSwitchCheckbox}
                name={name}
                id={name}
                checked={checked}
                disabled={disabled}
                onChange={callBack}
                />
                <label className={styles.toggleSwitchLabel} 
                       htmlFor={name} >
                <span className={styles.toggleSwitchInner} data-yes={optionLabels[0]} data-no={optionLabels[1]} />
                <span className={styles.toggleSwitchSwitch} />
                </label>
            </div>
        </div>
       
    )
}

