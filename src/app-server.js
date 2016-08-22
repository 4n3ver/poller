"use strict";

import path from "path";
import express from "express";
import socket from "./socket";
import router from "./routes";
import {
    PORT,
    IP
} from "./config";

const app = express();

// use middleware to serve static resource to all routes
app.use(express.static(path.resolve(__dirname, "../public")));
// transpiled static resources
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
    "/stylesheets/lib/",
    express.static(path.resolve(__dirname, "../semantic/dist"))
);

app.use(router);

const server = app.listen(PORT, IP, () => {
    console.log(`Server listening at ${IP}:${PORT}`);
});

socket.listen(server);

