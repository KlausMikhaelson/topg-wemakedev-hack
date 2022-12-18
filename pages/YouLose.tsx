import styles from '../styles/Home.module.css'

const Youlose = () => {
    return(
        <div className={styles.CP}>
            <h1 style={{color: "white"}}>You Lose</h1>
            <img src="./Cp.png" alt="CP" />
            <h1>"Interview ke liye CP Nahi karna thaa"</h1>
            <div className={styles.button}>
            <a href="/" style={{padding: "10px", backgroundColor: 'white', color: "black", width: "200px", textAlign: "center"}}>Try again and choose the correct one</a>
            </div>
        </div>
    )
}

export default Youlose;