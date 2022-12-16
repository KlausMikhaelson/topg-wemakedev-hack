import { useLoader } from "@react-three/fiber";

const Ground = () => {
    return(
        <>
        <mesh>
            <planeBufferGeometry args={[150,150, 20, 20]} />
            <meshStandardMaterial color={'#0000FF'} />
        </mesh>
        </>
    )
}

export default Ground;