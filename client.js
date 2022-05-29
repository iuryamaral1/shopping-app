const io = require("socket.io-client");

const socket = io("ws://localhost:3000");

const products = [
    {
        name: 'Feijão',
        price: 10.0,
        expirationDate: '2022-12-12'
    }
]

socket.emit("create-new-room", "novaSala");
console.log('emited event for creating new room')