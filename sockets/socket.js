"use strict";
const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();
bands.addBands(new Band("Queen"));
bands.addBands(new Band("Nirvana"));
bands.addBands(new Band("Linking park"));
bands.addBands(new Band("Solaris"));

// console.log(bands);
// Mensajes de sockets
io.on("connection", (client) => {
    console.log("Cliente Conectado");

    client.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    // client.on('event', data => { /* … */ });

    // client.emit('active-bands', bands.getBands());

    // client.on('mensaje', (payload) => {
    //     console.log('mensaje', payload);
    //     io.emit('mensaje', {admin: 'Nuevo mensaje'});
    // });

    // client.on('nuevo-mensaje', (payload) => {
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje',payload);
    // });

    // client.on('vote-band', (payload) => {
    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('add-band', (payload) => {
    //     const newBand = new Band(payload.name);
    //     bands.addBands(newBand);
    //     io.emit('active-bands', bands.getBands());
    // });
    // client.on('delete-band', (payload) => {
    //     bands.deleteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // });
});
