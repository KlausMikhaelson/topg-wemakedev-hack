// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader"
import { useLoader } from "@react-three/fiber"


const Intro = () => {

    const WelcomeMap = useLoader(TextureLoader, './Welcome.png')
    // colorMap.wrapS = RepeatWrapping
    // colorMap.wrapT = RepeatWrapping
    // colorMap.repeat.set(150,150)

    return(
        <mesh position={[0, 1, -10]}>
            <boxBufferGeometry args={[15, 10]}/>
            <meshBasicMaterial map={WelcomeMap} />
        </mesh>
    )
}

export default Intro;