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
import Intro from '../Component/Intro'

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
        <Hurdle boundary={200} count={30}/>
        <fog attach="fog" color="#03A062" near={10} far={50} />
        <Intro />
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
