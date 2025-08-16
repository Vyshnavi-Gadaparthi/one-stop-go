 const socket = io('http://localhost:8081'); // Adjust the URL as needed

 socket.on('receive_msg', (msg) => {
    console.log("Message received from server: " + msg);
    addMessageToChat(msg, 'receive'); // Add the received message to the chat
 });

var sendMsg = () => {
    var msg = document.getElementById("msg").value;
    msg = msg.trim(); // Trim whitespace
    document.getElementById("msg").value = ""; 
    addMessageToChat(msg, 'send');

    socket.emit("user_send_msg", msg); // Emit the message to the server
};

var addMessageToChat = (msg, type) => {    
    var newMsg = document.createElement("div");
    if (type === 'send') {
        newMsg.className = "send_msg";
    } else {
        newMsg.className = "receive_msg";   
    }
    newMsg.textContent = msg;
    
    document.querySelector(".msgContainer").appendChild(newMsg);
    // Clear input field
}