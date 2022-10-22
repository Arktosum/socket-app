const chatForm = document.getElementById('chatForm');
const messageBox = document.getElementById('messageBox');

let Username = 'NoName'
const socket = io()
const authForm = document.getElementById('authForm');

authForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries())
    if(data.password === "abcd"){
        alert("Authorized Succesfully!")
        Username = data.name;
        authForm.style.display = 'none';
        chatForm.style.display = 'block'
        messageBox.style.display = 'block'
    }
    else{
        alert("Invalid Password!")
    }
})


socket.on('message',(message)=>{
    let msg = message.message;
    let name = message.sender;
    messageBox.innerHTML += `<div class="chat-message">${name} : ${msg}</div>` 
    messageBox.scrollTop = messageBox.scrollHeight;
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.children[0].value
    socket.emit('chatMsg',{message : msg,sender : Username})
    e.target.children[0].value = ``
})