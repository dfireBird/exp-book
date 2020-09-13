import { getRepository, Raw } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Book } from "../entity/Book";

interface IBookQueryParameter {
    name: string;
    publication_year: number;
    edition: string;
    authors: string[];
}

export class BookController {
    private bookRepository = getRepository(Book);

    async all(request: Request, response: Response, next: NextFunction) {
        let query: IBookQueryParameter = {} as IBookQueryParameter;
        if (request.query.name !== undefined) {
            query.name = request.query.name as string;
        }
        if (request.query.publication_year !== undefined) {
            query.publication_year = parseInt(
                request.query.publication_year as string
            );
        }
        if (request.query.edition !== undefined) {
            query.edition = request.query.edition as string;
        }
        if (request.query.author !== undefined) {
            const query_author = request.query.author as string;

            return this.bookRepository.find({
                ...query,
                authors: Raw(
                    (alias) => `${alias} && '{${query_author}}'::varchar[]`
                ),
            });
        }

        return this.bookRepository.find({ ...query });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const bookToRemove = await this.bookRepository.findOne(
            request.params.id
        );

        if (bookToRemove !== undefined) {
            await this.bookRepository.remove(bookToRemove);
            return bookToRemove;
        } else {
            response.status(404);
            return response.send("Provided id not found");
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const bookToUpdate = await this.bookRepository.findOne(
            request.params.id
        );

        if (bookToUpdate === undefined) {
            response.status(404);
            return response.send("Provided id not found");
        }

        if (typeof request.body.name === "string") {
            bookToUpdate.name = request.body.name;
        }
        if (typeof request.body.publication_year === "number") {
            bookToUpdate.publication_year = request.body.publication_year;
        }
        if (typeof request.body.edition === "string") {
            bookToUpdate.edition = request.body.edition;
        }
        if (Array.isArray(request.body.authors)) {
            bookToUpdate.authors = request.body.authors;
        }

        return this.bookRepository.save(bookToUpdate);
    }
}
