// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import React, { forwardRef, useEffect, useRef, useState } from "react";
// @ts-ignore
import * as THREE from "three"

// @ts-ignore
function getRandomArbitrary(low, high) {
  return Math.random() * (high - low) + low;
}

type HurdleType = {
  position: { x: number, z: number }
  box: number;
}

type props = {
  boundary: number;
  count: number;
}


const Hurdles: React.FC<props> = ({ boundary, count }) => {

//   const hurdle01 = useLoader(GLTFLoader, "./models/hurdle01.glb")
//   const hurdle02 = useLoader(GLTFLoader, "./models/hurdle02.glb")
//   const hurdle03 = useLoader(GLTFLoader, "./models/hurdle03.glb")
  const [hurdles, setHurdles] = useState<HurdleType[]>([]);

const Hurdle01 = () => {
    return(
        <mesh>
            <boxBufferGeometry args={[10, 10]}/>
            <meshBasicMaterial />
        </mesh>
    )
}

const Hurdle02 = () => {
    return(
        <mesh>
            <boxBufferGeometry args={[10, 20]}/>
            <meshBasicMaterial />
        </mesh>
    )
}
const Hurdle03 = () => {
    return(
        <mesh>
            <boxBufferGeometry args={[10, 20]}/>
            <meshBasicMaterial />
        </mesh>
    )
}

  const [ref] = useBox(() => ({
    type: 'Static',
    mass: 1,

  }))

  // googled this stuff helps in preventing overlap

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    let aLeftofB = maxAx < minBx
    let aRightofB = minAx > maxBx
    let aAboveB = minAz > maxBz
    let aBelowB = maxAz < minBz
    return !(aLeftofB || aRightofB || aAboveB || aBelowB);
  }

    const isOverLapping = (
    index: number,
    hurdles: any,
    hurdless: any[]) => {
    console.log(hurdles.position);
    const minTargetX = hurdles.position.x - hurdles.box / 2;
    const maxTargetX = hurdles.position.x + hurdles.box / 2;
    const minTargetZ = hurdles.position.z - hurdles.box / 2;
    const maxTargetZ = hurdles.position.z + hurdles.box / 2;
    for (let i = 0; i < index; i++) {
      let minChildX = hurdless[i].position.x - hurdless[i].box / 2;
      let maxChildX = hurdless[i].position.x + hurdless[i].box / 2;
      let minChildZ = hurdless[i].position.x - hurdless[i].box / 2;
      let maxChildZ = hurdless[i].position.x + hurdless[i].box / 2;
      if (
        boxIntersect(
          minTargetX,
          maxTargetX,
          minTargetZ,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        console.log("Content box overlapping!", hurdles.position);
        return true;
      }
    }
    return false;

  }

  // so that it doesn't go out of bounds

  const newPos = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePos = (hurdleArray: HurdleType[], boundary: number) => {
    hurdleArray.forEach((hurdles, index) => {
      do{
        hurdles.position.x = newPos(hurdles.box, boundary);
        hurdles.position.z = newPos(hurdles.box, boundary);
      } while(isOverLapping(index, hurdles, hurdleArray))
    })
    setHurdles(hurdleArray);
  }

  useEffect(() => {
    const tempHurdle: HurdleType[] = [];
    for (let i = 0; i < count; i++) {
      tempHurdle.push({ position: { x: 0, z: 0 }, box: 1 })
    }
    console.log(tempHurdle)
    updatePos(tempHurdle, boundary);
  }, [boundary, count])

  return (
    <>
      {hurdles.map((hurdless, index) => {
        return (
          <>
          <object3D key={index} position={[hurdless.position.x, 0, hurdless.position.z]}>
            {/* <primitive scale={[0.01, 0.01, 0.01]} object={hurdle02.scene.clone()} />
            <primitive scale={[0.01, 0.01, 0.01]} object={hurdle03.scene.clone()} /> */}
            <Hurdle01 />
          </object3D>
          {/* <object3D key={index} ref={ref}>
            <primitive object={hurdle01.scene.clone()} scale={[0.01, 0.01, 0.01]} position={[getRandomArbitrary(5, 60), 0, getRandomArbitrary(0, 100)]}/>
            <Hurdle02 />
            </object3D> */}
          </>
        )
      })}

    </>
  )
}

export default Hurdles;


