import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from '../Component/Ground'
import {Suspense, useEffect} from "react"
import Player from '../Component/Player'
import {Physics} from "@react-three/cannon"
// import SocketHome from './Socket'
import io from 'socket.io-client'

let socket;

export default function Home() {


  return (
    <>
    <div className={styles.container}>
        
    <Canvas>
      <Physics>
      <ambientLight intensity={0}/>
      {/* <OrbitControls /> */}
      {/* <SocketHome /> */}
      <Suspense fallback={null}>
        <Player />
      <Ground />
      <Environment preset='city' />
      </Suspense>
      </Physics>
    </Canvas>
    </div>
    </>
  )
}
