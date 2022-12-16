import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from '../Component/Ground'
import {Suspense} from "react"
import Player from '../Component/Player'
import { useEffect } from 'react'
import io from "socket.io-client"

let socket


const socketInitializer = async () => {
  await fetch('/api/socket')
  socket = io()

  socket.on('connect', () => {
    console.log("connected")
  })
}

export default function Home() {
  // @ts-ignore
  useEffect(() => {
    socketInitializer();
  }
  , [])

  return (
    <>
    <div className={styles.container}>
    <Canvas>
      <ambientLight intensity={0.5}/>
      <OrbitControls />
      <Suspense fallback={null}>
        <Player />
      <Ground />
      <Environment preset='city' />
      </Suspense>
    </Canvas>
    </div>
    </>
  )
}
