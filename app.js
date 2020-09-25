var socket = io("https://cs-go-chat.herokuapp.com/");

document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    setTimeout(() => {
      document.getElementById("sendbtn").click();
    }, 350);
  }
});

document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    document.getElementById("userbtn").click();
  }
});

var send = () => {
  if (
    document.getElementById("username").value.length == 17 &&
    username.length > 1
  ) {
    socket.emit("message", document.getElementById("message").value);
    document.getElementById("message").value = " ";
    return false;
  } else {
    alert("Please enter and submit your steam ID");
  }
};

var setusername = () => {
  socket.emit("username", document.getElementById("username").value);
};

socket.on("user", (user) => {
  username = user;
  console.log(user);
});

var username = "";
var message = " ";

socket.on("message", (msg) => {
  message = msg;
  document.getElementById("messages").innerHTML +=
    "<h1>" + username + "</h1>" + msg + "<br>";
});
