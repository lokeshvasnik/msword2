import { Server } from "socket.io";
import {
    getDocuments,
    updateDocument,
} from "./controller/documentController.js";
import Connection from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

// MONGODB CONNECTION
Connection();

const io = new Server(3003, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("get-document", async (documentId) => {
        const document = await getDocuments(documentId);

        socket.join(documentId);
        socket.emit("load-document", document.data);

        socket.on("send-changes", (delta) => {
            socket.broadcast.emit("receive-changes", delta);
        });

        socket.on("save-document", async (data) => {
            await updateDocument(documentId, data);
        });
    });

    console.log("Connected");
});
