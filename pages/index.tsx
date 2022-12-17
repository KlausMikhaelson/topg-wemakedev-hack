import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from '../Component/Ground'
import {Suspense, useEffect} from "react"
import Player from '../Component/Player'
import {Physics} from "@react-three/cannon"
import { GiftModel } from '../Component/Player'
// import SocketHome from './Socket'
import io from 'socket.io-client'
import Hurdle from '../Component/Hurdles'

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
        <Hurdle boundary={100} count={10}/>
        {/* <fog attach="fog" color="#03A062" near={5} far={10} /> */}
        <GiftModel />
      <Ground />
      <Environment preset='city' />
      </Suspense>
      </Physics>
    </Canvas>
    </div>
    </>
  )
}
