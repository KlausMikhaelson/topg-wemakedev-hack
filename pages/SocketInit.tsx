import { useRouter } from "next/router";
import * as React from "react"
import io from "socket.io-client"

let socket;
export default function Room() {
    const router = useRouter()
    const { room, roomName } = router.query;
    const [name2, setName2] = React.useState(name);
    const [path, setPath] = React.useState("")

    React.useEffect(() => {
        socketInitializer(name);
    }, [name]);
    
    const socketInitializer = () => {
        try {
            console.log("here 1");
            await fetch("/api/socket?option=connection");
            socket = io();
            socket.on("connect", () => {
                console.log("KPlayer joined")
            });
        }
    }

}