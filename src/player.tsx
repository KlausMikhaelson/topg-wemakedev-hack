import { useGLTF } from "@react-three/drei";

const Player = () => {
    const model = useGLTF("./assets/player1.glb");
    console.log(model)
    return(
        // @ts-ignore
        <primitive object={model.scene} scale={0.5} />
    )
}

export default Player