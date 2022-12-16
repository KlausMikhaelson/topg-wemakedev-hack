import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react";

const Player = () => {
    const model = useGLTF("./player1.glb");
    const {actions} = useAnimations(model.animations, model.scene);
    console.log(model)

    useEffect(() => {
        actions?.walk?.play();
    })

    return(
        <primitive object={model.scene} scale={0.5} />
    )
}

export default Player;