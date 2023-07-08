import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    menu: number;

    @Column({ nullable: false })
    cnt: number;
}