import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from './Component/Ground'
import { Physics } from '@react-three/cannon'


export default function Home() {
  return (
    <>
    <div className={styles.container}>
    <Canvas camera={{position:[0,2,0]}}>
      <ambientLight />
      <OrbitControls />
      <Ground />
    </Canvas>
    </div>
    </>
  )
}
