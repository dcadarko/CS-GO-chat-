var socket = io("https://cs-go-chat.herokuapp.com/");

document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    setTimeout(() => {
      document.getElementById("sendbtn").click();
    }, 500);
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

var stats = [];

socket.on("user", async (user) => {
  username = user;
  console.log(user);
});

socket.on("stats", (data) => {
  var table = document.getElementById("users-table");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var kd = data.kd;
  cell1.classList.add(username);
  cell2.classList.add(kd.toFixed(2));
  cell3.classList.add(data.time.toFixed() + "h");
  cell1.innerHTML = username;
  cell2.innerHTML = kd.toFixed(2);
  cell3.innerHTML = data.time.toFixed() + " h";
  $(`.${username}`).not(":first").siblings().hide();
  $(`.${username}`).not(":first").hide();
});

var username = "";
var message = " ";

socket.on("message", (msg) => {
  message = msg;
  document.getElementById("messages").innerHTML +=
    "<span class=username-bx>" +
    username +
    "</span>" +
    ":" +
    " " +
    msg +
    "<br>";
});

window.setInterval(function () {
  var messagebox = document.getElementById("messages");
  messagebox.scrollTop = messagebox.scrollHeight;
}, 50);
