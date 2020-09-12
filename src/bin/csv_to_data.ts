import "reflect-metadata";
import fs from "fs/promises";
import parse from "csv-parse/lib/sync";
import { createConnection } from "typeorm";
import { Author } from "../entity/Author";

async function main() {
    if (process.argv.length < 3) {
        console.log(
            `Missing input csv file.
Use \`ts-node src/bin/csv_to_data.ts <file.csv>\` format`
        );
        return;
    } else if (process.argv.length > 3) {
        console.log(
            `Given ${process.argv.length - 2
            } argument. Only one arguments is needed.
Use \`ts-node src/bin/csv_to_data.ts <file.csv>\` format`
        );
        return;
    }
    const connection = await createConnection();
    const authors_csv = await fs.readFile(process.argv[2]);

    const records = parse(authors_csv)
        .map((records) => records[0] as string)
        .filter((records) => records !== "name");

    const authors = records.map((author_name) => {
        const author = new Author();
        author.name = author_name;
        return author;
    });

    while (authors.length > 0) {
        await connection
            .getRepository(Author)
            .save(authors.splice(0, 50000), { chunk: 50000 });
    }

    console.log("CSV data is imported into the database");
}

main();
