
const chatForm = document.getElementById('chatForm');
const messageBox = document.getElementById('messageBox');

const socket = io()

socket.on('message',(message)=>{
    messageBox.innerText += "\n" + message 
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.children[0].value
    socket.emit('chatMsg',msg)
    e.target.children[0].value = ``
})