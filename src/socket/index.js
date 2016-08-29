"use strict";

import socketIO from "socket.io";

/* TODO: temporary server data */
let connection = [];
let audiences = [];
let speaker = {};
let title = "";
let questions = require("../../data/questions");
let currentQuestion = null;
let results = {};
/* TODO: temporary server data */

let io;

const listen = (server) => {
    io = socketIO.listen(server);
    setupEventListener(io);
};

const setupEventListener = (io) => {
    io.sockets.on("connection", (socket) => {
        // disconnect will only happened once
        socket.once("disconnect", function () {
            // TODO: optimize this maybe...
            connection.splice(connection.indexOf(socket), 1);
            let disconnectedMemberIndex = audiences.findIndex(
                audience => audience.id === this.id);
            if (disconnectedMemberIndex !== -1) {
                let memberLeft = audiences.splice(disconnectedMemberIndex, 1)[0];
                console.log(
                    `Audience ${memberLeft.name.first} ${memberLeft.name.last} is disconnected, ${audiences.length} left in the session`
                );
                io.sockets.emit("audiences", audiences);
            } else if (this.id === speaker.id) {
                console.log(
                    `Speaker ${speaker.name.first} ${speaker.name.last} has left`);
                title = "";
                speaker = {};
                io.sockets.emit("end", {
                    title,
                    speaker
                });
            }

            console.log(
                `${socket.id} disconnected, ${connection.length} sockets remaining`
            );
            socket.disconnect();    // make sure to close half-open connection
        });
        socket.on("join", function (payload) {
            let audience = payload.member;
            audience.id = this.id;
            audiences.push(audience);
            console.log(
                `Audience ${audience.name.first} ${audience.name.last} has joined, ${audiences.length} in the session`
            );
            io.sockets.emit("audiences", audiences);
            this.emit("joined", payload);
        });
        socket.on("start", function (payload) {
            // TODO: the callback might be bounded before called. check docs?
            console.log(payload);
            payload.member.id = this.id;
            speaker = payload.member;
            title = payload.title;
            this.emit("joined", payload);
            console.log(
                `Speaker ${speaker.name.first} ${speaker.name.last} has joined, presentation ${title} started!`);
            io.sockets.emit("start", {
                title,
                speaker: speaker.name
            });
        });
        socket.on("ask", (question) => {
            currentQuestion = question;
            io.sockets.emit("ask", currentQuestion);
            console.log(`Question asked: ${question.question}`);
        });
        socket.on("answer", function (payload) {
            if (!results[payload.question]) {
                results[payload.question] = {};
            }
            results[payload.question][this.id] = payload.answer;
            console.log(results);
            io.sockets.emit("results", results[currentQuestion]);
        });

        socket.emit("welcome", {
            title,
            speaker: speaker.name,
            audiences,
            questions,
            currentQuestion,
            results: results[currentQuestion]
        });
        connection.push(socket);
        console.log(
            `${socket.id} connected, ${connection.length} sockets connected`
        );
    });
};

const socket = {
    listen
};

export default socket;
