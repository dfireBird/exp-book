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
        if (request.query.authors !== undefined) {
            const query_authors = JSON.parse(request.query.authors as string);

            return this.bookRepository.find({
                ...query,
                authors: Raw(
                    (alias) =>
                        `${alias} && '{${query_authors.join(",")}}'::varchar[]`
                ),
            });
        }

        return this.bookRepository.find({ ...query });
    }
}
