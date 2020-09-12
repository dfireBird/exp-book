import { AuthorController } from "../controller/AuthorController";

export const AuthorRoutes = [
    {
        method: "get",
        route: "/authors",
        controller: AuthorController,
        action: "pagination",
    },
];
