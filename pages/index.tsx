import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Ground from '../Component/Ground'
import {Suspense} from "react"


export default function Home() {
  return (
    <>
    <div className={styles.container}>
    <Canvas>
      <ambientLight />
      <OrbitControls />
      <Suspense fallback={null}>
      <Ground />
      <Environment preset='city' />
      </Suspense>
    </Canvas>
    </div>
    </>
  )
}
