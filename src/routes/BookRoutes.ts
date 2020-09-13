import { BookController } from "../controller/BookController";

export const BookRoutes = [
    {
        method: "get",
        route: "/books",
        controller: BookController,
        action: "all",
    },
];
