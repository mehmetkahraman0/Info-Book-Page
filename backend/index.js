import express from "express";
import { PORT, mongoDBUrl } from "./config.js"
import mongoose from "mongoose";
import route from "./routes/booksRoute.js"
import cors from "cors"

const app = express();

// middleware for parsing request body
app.use(express.json());


//CORS policy


//app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


app.get("/", (req, res) => {
    console.log(req)
    return res.status(234).send("welcome")
})

app.use("/books", route);

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log("App is listening")
        })
    })
    .catch(err => {
        console.log(err);
    });

