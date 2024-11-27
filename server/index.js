const express = require('express');
const cors = require('cors');
const app = express()
const redis = require('redis');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})
const client = redis.createClient({
    legacyMode: true,
    host: "localhost", 
    port: 6379
})
client.connect()
    .then(() => console.log("connected to Redis"))
    .catch(error => console.error("can't connecting to Redis: ", error))


const Jokes = []
let currentData = ''

io.on('connection', (socket) => {
    console.log("connection to Socket!");

    socket.on('requestDelete', () => {
        client.del(currentData.id)
        socket.emit('deleted', console.log("data daleted"))
    })
    
})
const fetchAndStoreData = async (req, res) => {
    try {
        const fetchData = await fetch("https://api.chucknorris.io/jokes/random")
        const data = await fetchData.json()
        console.log(data);
        Jokes.push(data)
        currentData = data
        console.log(Jokes.length);
        io.emit('data', {
            id: data.id,
            value: data.value
       })
        
        client.set(data.id, JSON.stringify(data), (err, repaly) => {
            if (err) {
                console.log("error to store data: ", err);
            } else {
                console.log("data stored in Redis! ", data.id);
            }
        })
        return data
    } catch (error) {
        console.log(error)
    }
}


setInterval(fetchAndStoreData, 60000)

const port = process.env.PORT || 1000

server.listen(port, () => {
    console.log("listening to port: ", port);
})