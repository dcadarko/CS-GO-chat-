const express = require("express");
const http = require('http');
const socket = require("socket.io");
const fetch = require("node-fetch");
const cors = require("cors");

/*App initalisation*/
const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(cors());

var steamusername = " ";
var key = process.env.steamKey;

/* Socket.io connection for chat */
io.on("connection", (socket) => {
  /*Getting a message and sending it back to the front end */
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
  /* Getting the steam ID and sending back the steam username */
  socket.on("username", (username) => {
    fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${username}`
    )
      .then((res) => res.json())
      .then((json) => (steamusername = json.response.players[0].personaname));
    io.emit("user", steamusername);
    /* Getting the stats and sending them to the front end */
    if (steamusername) {
      fetch(
        `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${key}&steamid=${username}`
      )
        .then((res) => res.json())
        .then((json) =>
          io.emit("stats", {
            kd:
              json.playerstats.stats[0].value / json.playerstats.stats[1].value,
            time: json.playerstats.stats[2].value / 60 / 60,
          })
        );
    }
  });
});

/* Server run */
server.listen(process.env.PORT || 3000, () => {
  console.log("server running");
});
