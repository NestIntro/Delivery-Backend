import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ default: null, nullable: true })
    user_id: number;

    @Column({ default: 'WAITING', nullable: true })
    status: string;
}