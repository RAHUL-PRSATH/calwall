import express from "express";
const app = express();
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import wallpaperRoute from "./routes/wallpaper.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Disposition', 'Content-Length']
}));

const server = http.createServer(app);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/healthz", (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use("/api/wallpaper", wallpaperRoute);

app.get("/", (req, res) => {
    res.status(200).json({ status: 'ok' });
});

server.listen(3000, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});