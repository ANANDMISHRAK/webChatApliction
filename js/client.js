const socket= io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
   // console.log(e);
    const message = messageInput.value ;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const names = prompt("Enter your name to join");
socket.emit('new-user-Joined', names);


//esse jo new user join krega uska name show hoga
socket.on('user-joined', names=>{
    append(`${names} joined the chat`, 'right');
})


// send kiya huaa message ko dikhayega
socket.on('receive', data =>{
   // console.log(data);
    append(`${data.name}: ${data.message}`, 'left')
})


socket.on('leave', name =>{
    console.log(name);
    console.log("ram")
    append(`${name} left the chat`, 'left')
})