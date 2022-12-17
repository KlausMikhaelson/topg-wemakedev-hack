import React from "react";
import styles from '../styles/Home.module.css'

const WonGame = () => {
    return(
        <div className={styles.Game}>
        <video className={styles.RickROll} src="../Rick.mp4" autoPlay></video>
        </div>
    )
}

export default WonGame;