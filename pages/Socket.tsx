import { useEffect } from "react";
import io from "socket.io-client"

let socket;

const SocketHome = () => {
    useEffect(() => {
        socketInitializer();
    })
    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log("connected")
        })
    }

    return null;
}

export default SocketHome;