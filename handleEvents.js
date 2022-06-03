const checkList = require('./useCases/rooms/hasList')
const { addNewShoppingList } = require('./useCases/rooms/addNewShoppingList')

const handle = (socket) => {
    socket.on('join-room', (room, username) => {
        socket.join(room);
        socket.data.username = username;
        socket.to(room).emit('message', `New user ${socket.data.username} has just joined room ${room}!`);
    });

    socket.on('message', (room, message) => {
        socket.to(room).emit('message', `${socket.data.username} says: ${message}`)
    });

    socket.on('create-new-list', async (room, shoppingList) => {
        const hasList = await checkList.hasList(room);
        if (hasList) {
            socket.emit('message', `The room ${room} already have an active shopping list`);
        } else {
            const addedShoppingList = addNewShoppingList(JSON.parse(shoppingList))
            socket.to(room).emit('message', `${socket.data.username} added a new shopping list`);
            socket.to(room).emit('receive-new-shopping-list', JSON.stringify(addedShoppingList));
        }
    });
}

module.exports = { handle }