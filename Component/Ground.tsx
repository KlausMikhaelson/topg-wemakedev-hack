import { useLoader } from "@react-three/fiber";
// @ts-ignore
import {NearestFilter, RepeatWrapping} from "three"
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader"
import { usePlane } from "@react-three/cannon";

const Ground = () => {

    const colorMap = useLoader(TextureLoader, 'texture.jpg')
    colorMap.wrapS = RepeatWrapping
    colorMap.wrapT = RepeatWrapping
    colorMap.repeat.set(150,150)

    const [ref] = usePlane(() => ({
        rotation: [Math.PI * -0.5, 0, 0],
        mass: 10,
        type: "Static",
        material: "ground"
    }))

    return(
        <>
        <mesh ref={ref} rotation-x={Math.PI * -0.5}>
            <ambientLight />
            <planeBufferGeometry args={[1000,1000]} />
            <meshStandardMaterial map={colorMap}/>
        </mesh>
        </>
    )
}

export default Ground;