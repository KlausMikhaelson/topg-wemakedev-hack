import { useRouter } from "next/router";
import React from "react";
import styles from '../styles/Home.module.css'

const WonGame = () => {
    const router = useRouter()
    return (
        <div className={styles.Game}>
            <video className={styles.RickROll} src="../Rick.mp4" autoPlay></video>
            <button onClick={() => {

                router.push('/chatPage')
            }}>
                Just Kidding! Click here to Join the channel and access it
            </button>
        </div>
    )
}

export default WonGame;