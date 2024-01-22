import { Server } from "socket.io";
import {
    getDocuments,
    updateDocument,
} from "./controller/documentController.js";
import Connection from "./db/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

// MIDDLE WARE
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
// MONGODB CONNECTION
Connection();

// Routes
app.use("/api", userRoute);

const io = new Server(3005, {
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

app.listen(3000, () => console.log("Server Started"));
