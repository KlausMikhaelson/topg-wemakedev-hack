import { Server } from 'socket.io'

// @ts-ignore
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('connect', msg => {
        console.log("player addd")
        socket.broadcast.emit('update-player', "A new player has been added")
        console.log("emmitted stuff")
      })

      socket.on('error', function (err) {
        console.log(err);
    });
    })
  }
  res.end()
}

export default SocketHandler