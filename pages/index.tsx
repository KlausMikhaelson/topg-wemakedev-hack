import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from '../Component/Ground'
import {Suspense} from "react"
import Player from '../Component/Player'
import SocketHome from './Socket'

export default function Home() {

  return (
    <>
    <div className={styles.container}>
    <Canvas>
      <ambientLight intensity={0.5}/>
      <OrbitControls />
      
      <Suspense fallback={null}>
        {/* <Player /> */}
        <SocketHome />
      <Ground />
      <Environment preset='city' />
      </Suspense>
    </Canvas>
    </div>
    </>
  )
}
