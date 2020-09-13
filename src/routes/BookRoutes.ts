import { BookController } from "../controller/BookController";

export const BookRoutes = [
    {
        method: "get",
        route: "/books",
        controller: BookController,
        action: "all",
    },
    {
        method: "post",
        route: "/books",
        controller: BookController,
        action: "save",
    },
    {
        method: "delete",
        route: "/books/:id",
        controller: BookController,
        action: "remove",
    },
];
