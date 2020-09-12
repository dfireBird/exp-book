import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { json } from "express";

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(json());

        app.get("/", (req, res) => {
            res.send(req.body);
        });

        app.listen(process.env.PORT || 8080);

        console.log(`Server has started on port ${process.env.PORT || 8080}`);
    })
    .catch((error) => console.log(error));
