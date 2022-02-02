"use strict";
const express = require("express");
const app = express();
// const path = require("path");
require("dotenv").config();
const { dbConnections } = require("./database/config");
dbConnections();

// const publicPath = path.resolve(__dirname,'public');

// body parser
app.use(express.json());

// rutas
app.use("/api/login", require("./routes/auth"));

// Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

app.use(express.static("public"));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
