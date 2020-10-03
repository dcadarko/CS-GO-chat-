var socket = io("https://cs-go-chat.herokuapp.com/");

/* Random number of ms to prevent message mixing up */
var randint = Math.floor(Math.random() * 350 + 250);

/* Sending a message */
document.body.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    setTimeout(() => {
      document.getElementById("sendbtn").click();
      document.getElementById("sendbtn").disabled = true;
    }, randint);
    document.getElementById("sendbtn").disabled = false;
  }
});

/* Sending username */
document.body.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    document.getElementById("userbtn").click();
  }
});

/* Function for message sending */
var send = () => {
  socket.emit("message", document.getElementById("message").value);
  document.getElementById("message").value = " ";
  return false;
};

/* Getting username */
socket.on("user", async (user) => {
  username = user;
});

/* Sending username */
var setusername = () => {
  socket.emit("username", document.getElementById("username").value);
};

var stats = [];

/* Displaying stats */
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

/* Displaying messages */
socket.on("message", (msg) => {
  message = msg;
  var placehoder = document.getElementById("msg-placeholder");
  placehoder.classList.add("hide");
  if (username) {
    document.getElementById("messages").innerHTML +=
      "<span class=username-bx>" +
      username +
      "</span>" +
      ":" +
      " " +
      msg +
      "<br>";
  }
});

/* Auto Scroll */
window.setInterval(function () {
  var messagebox = document.getElementById("messages");
  messagebox.scrollTop = messagebox.scrollHeight;
}, 500);
