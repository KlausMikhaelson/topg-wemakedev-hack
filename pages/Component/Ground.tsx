import { useLoader } from "@react-three/fiber";
// import { LandTexture } from "./Texture";
// @ts-ignore
import {NearestFilter, RepeatWrapping} from "three"
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader"

const Ground = () => {

    const colorMap = useLoader(TextureLoader, 'texture.jpg')
    colorMap.wrapS = RepeatWrapping
    colorMap.wrapT = RepeatWrapping
    colorMap.repeat.set(150,150)

    return(
        <>
        <mesh rotation-x={Math.PI * -0.5}>
            <ambientLight />
            <planeBufferGeometry args={[150,150, 20, 20]} />
            <meshStandardMaterial map={colorMap}/>
        </mesh>
        </>
    )
}

export default Ground;