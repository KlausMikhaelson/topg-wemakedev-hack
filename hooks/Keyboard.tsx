import { useEffect, useState } from "react"

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false
    });

    const keys = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        Space: "jump"
    }

// @ts-ignore
    const findKey = (key: string) => keys[key];

    useEffect(() => {
// @ts-ignore
        const handleKeydown = (e) => {
            setInput((m) => ({ ...m, [findKey(e.code)]: true}))
        }
// @ts-ignore
        const handleKeyup = (e) => {
            setInput((m) => ({...m, [findKey(e.code)]: false}))
        }

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);

        return() => {
            document.removeEventListener("keydown", handleKeydown)
            document.removeEventListener("keyup", handleKeyup)
        };

    }, [])


    return input;

}