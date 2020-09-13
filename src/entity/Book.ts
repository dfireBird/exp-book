import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    edition: string;

    @Column()
    publication_year: number;

    @Column("varchar", { array: true })
    authors: string[];
}
