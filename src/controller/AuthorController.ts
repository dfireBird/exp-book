import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Author } from "../entity/Author";

export class AuthorController {
    private authorRepository = getRepository(Author);

    async pagination(request: Request, response: Response, next: NextFunction) {
        const limit = parseInt((request.query.limit as string) || "10");
        const page = parseInt((request.query.page as string) || "1") - 1;
        return this.authorRepository.find({
            take: limit,
            skip: limit * page,
        });
    }
}
