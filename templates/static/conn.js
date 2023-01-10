function initConnectionMessaging() {
    window.addEventListener("beforeunload", sendMessage);
    setInterval(heartBeat, 1000)
}

function sendMessage() {
    socket.emit('my event', {data: 'closing'})
}

function heartBeat() {
    socket.emit('my event', {data: 'heartbeat'})
}
