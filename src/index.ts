import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { json } from "express";

import { AuthorRoutes } from "./routes/AuthorRoutes";
import { BookRoutes } from "./routes/BookRoutes";

createConnection()
    .then(async (connection) => {
        const app = express();
        app.use(json());

        const registerRoutes = (route) => {
            (app as any)[route.method](route.route, (req, res, next) => {
                const result = new (route.controller as any)()[route.action](
                    req,
                    res,
                    next
                );

                if (result instanceof Promise) {
                    result.then((result) =>
                        result !== null && result !== undefined
                            ? res.send(result)
                            : undefined
                    );
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        };

        AuthorRoutes.forEach(registerRoutes);
        BookRoutes.forEach(registerRoutes);

        app.listen(process.env.PORT || 8080);

        console.log(`Server has started on port ${process.env.PORT || 8080}`);
    })
    .catch((error) => console.log(error));
