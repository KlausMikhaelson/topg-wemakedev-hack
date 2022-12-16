import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"
import Player from '../Component/Player'
import {Html} from "@react-three/drei"

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const SocketHome = () => {
    console.log('SOCKETHOMEEE');
    // const [input, setInput] = useState('');

    const [numPlayers, setNumPlayers] = useState(0);

    useEffect(() => {
        console.log('USE EFFECT RAN');
        socketInitializer();
      }, []);
  
    const socketInitializer = async () => {
      console.log("Socket init called");

      await fetch('/api/socket');
      socket = io()
  
      socket.on('connect', () => {
        console.log('connected')
        setNumPlayers(numPlayers+1)
      })

      
  
    //   socket.on('update-input', msg => {
    //     setInput(msg)
    //   })
    }
  
    // const onChangeHandler = (e) => {
    //   setInput(e.target.value)
    //   console.log("onChangeHandler called");
    //   socket.emit('input-change', e.target.value)
    // }

    // let arr = Array.from({ length: numPlayers},(_, i) => <Player/>)
    console.log(numPlayers);
    return(
        Array.from({ length: numPlayers},(_, i) => <Player/>)
    );
}

export default SocketHome;