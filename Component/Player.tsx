import { useRouter } from 'next/router'
    // @ts-ignore 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Physics, useBox, useCompoundBody, usePlane } from '@react-three/cannon'
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { OrbitControls, useAnimations, useBoxProjectedEnv, useHelper } from "@react-three/drei";
import React, { forwardRef, useEffect, useRef } from "react";
import { useInput } from "../hooks/Keyboard";
    // @ts-ignore 
import * as THREE from "three"
// @ts-ignore
import { NearestFilter, RepeatWrapping } from "three"
// @ts-ignore
import { TextureLoader } from "three/src/loaders/TextureLoader"


const walkdirection = new THREE.Vector3()
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3()
    // @ts-ignore 
const directions = ({ forward, backward, left, right }) => {
    var directions = 0;

    // diagonals

    if (forward) {
        if (left) {
            directions = Math.PI / 4;
        } else if (right) {
            directions = -Math.PI / 4;
        }
    } else if (backward) {
        if (left) {
            directions = Math.PI / 4 + Math.PI / 2;
        } else if (right) {
            directions = -Math.PI / 4 - Math.PI / 2;
        } else {
            directions = Math.PI;
        }
        // left
    } else if (left) {
        directions = Math.PI / 2;
        // right
    } else if (right) {
        directions = -Math.PI / 2;
    }

    return directions;
}


// @ts-ignore
function getRandomArbitrary(low, high) {
    return Math.random() * (high - low) + low;
}

var CpPos = [getRandomArbitrary(-70, 70), 0, getRandomArbitrary(-70, 70)];

export const CPModel: React.FC = () => {
    const KunalOppo = useLoader(TextureLoader, './kunaloppo.png');
    const [Cpref] = useBox(() =>( {
        // @ts-ignore
        position: CpPos
    }))
    return(
        <>
        <mesh ref={Cpref} scale={2}>
            <ambientLight />
            <boxBufferGeometry args={[2,1,2]} />
            <meshBasicMaterial map={KunalOppo} />
        </mesh>
        </>
    )
}


var itemPos = [getRandomArbitrary(-70, 70), 0, getRandomArbitrary(-70, 70)];
export const GiftModel: React.FC = () => {
    const KunalMap = useLoader(TextureLoader, './kunal4.png')
    // colorMap.wrapS = RepeatWrapping
    // colorMap.wrapT = RepeatWrapping
    // colorMap.repeat.set(1,150)

    // const modelGift = useLoader(GLTFLoader, "./kunal2.glb")

    const [ref] = useBox(() => ({
        // type: 'static',
        // mass: 1,
        // @ts-ignore 
        position: itemPos
    }))

    return (
        <>
            <mesh ref={ref} rotation-x={Math.PI * -0.5} scale={2}>
                <ambientLight />
                <boxGeometry args={[2, 1, 2]}/>
                <meshStandardMaterial map={KunalMap} />
            </mesh>
        </>
    )
}


const Player: React.FC = () => {
    const { forward, backward, left, right, jump } = useInput()
    const modelPlayer = useLoader(GLTFLoader, "./player3.glb")
    const { actions } = useAnimations(modelPlayer.animations, modelPlayer.scene)

    const currentAction = useRef("")
    const controlsref = useRef<typeof OrbitControls>();
    const camera = useThree((state) => state.camera);

    const updateCamera = (moveX: number, moveZ: number) => {
        camera.position.x += moveX;
        camera.position.z += moveZ;
        camera.position.y = 3;

        cameraTarget.x = modelPlayer.scene.position.x;
        cameraTarget.y = modelPlayer.scene.position.y + 2;
        cameraTarget.z = modelPlayer.scene.position.z;
        // @ts-ignore
        if (controlsref.current) controlsref.current.target = cameraTarget;
    }

    useEffect(() => {
        let action = ""

        if (forward || backward || left || right) {
            action = "walk"
        } else if (jump) {
            action = "idle"
        } else {
            action = "idle"
        }

        if (currentAction.current != action) {
            const nextAction = actions[action];
            const current = actions[currentAction.current]
            current?.fadeOut(0.2);
            nextAction?.reset().fadeIn(0.2).play();
            currentAction.current = action;
        }

    }, [forward, backward, left, right, jump])


    useFrame((state, delta) => {
        if (currentAction.current == "walk") {
            let angleYcameraDirection = Math.atan2(
                camera.position.x - modelPlayer.scene.position.x,
                camera.position.z - modelPlayer.scene.position.z
            );
            let newDirections = directions({
                forward,
                backward,
                left,
                right
            });
            // rotating
            rotateQuarternion.setFromAxisAngle(
                rotateAngle,
                angleYcameraDirection + newDirections
            );
            modelPlayer.scene.quaternion.rotateTowards(rotateQuarternion, 0.2)

            camera.getWorldDirection(walkdirection);
            walkdirection.y = 0;
            walkdirection.normalize();
            walkdirection.applyAxisAngle(rotateAngle, newDirections);

            const velocity = currentAction.current == "walk" ? 8 : 2;

            const moveX = walkdirection.x * velocity * delta;
            const moveZ = walkdirection.z * velocity * delta;
            modelPlayer.scene.position.x += moveX;
            modelPlayer.scene.position.z += moveZ
            updateCamera(moveX, moveZ)
        }
    })

    const router = useRouter()
    var playerPos = [Math.round(modelPlayer.scene.position.x), Math.round(modelPlayer.scene.position.y), Math.round(modelPlayer.scene.position.z)];
    var avItemPos = [Math.round(itemPos[0]), Math.round(itemPos[1]), Math.round(itemPos[2])]
    var CPItempos = [Math.round(CpPos[0]), Math.round(CpPos[1]), Math.round(CpPos[2])]

    console.log(playerPos);
    console.log(avItemPos);
    console.log(CPItempos);
    if (
        // (playerPos[0] - avItemPos[0] < 2 && playerPos[1] - avItemPos[1] == 0) ||
        // (playerPos[1] - avItemPos[1] == 0 && playerPos[2] - avItemPos[2] < 2) &&
        // (playerPos[0] - avItemPos[0] < 2 && playerPos[2] - avItemPos[2] < 2)
        (playerPos[0] - avItemPos[0] == 0 && playerPos[1] - avItemPos[1] == 0 && playerPos[2] == avItemPos[2])
        ) {

        // console.log("You win")
        router.push('/YouWon');
    }
    if(
        (playerPos[0] - CPItempos[0] == 0 && playerPos[1] - CPItempos[1] == 0 && playerPos[2] == CPItempos[2])
    ) {
        router.push('/YouLose');
    }

    const [ref] = useBox(
        () => ({
            //   collisionFilterGroup: GROUP_BODY,
            //   collisionFilterMask: GROUP_GROUND,
            linearDamping: 0.4,
            mass: 1,
            //   ...props,
        }),
        // ref,
    )

    return (
        <>
        {/* @ts-ignore */}
            <mesh ref={ref}>
        {/* @ts-ignore */}
                <OrbitControls ref={controlsref} maxPolarAngle={Math.PI / 2.5} enableZoom={false} />
                <primitive scale={0.5} object={modelPlayer.scene} />
            </mesh>
        </>
    )
}

export default Player;