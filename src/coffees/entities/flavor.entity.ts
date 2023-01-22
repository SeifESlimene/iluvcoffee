import { ManyToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Coffee } from './coffee.entity';

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavors
    )
    coffees: Coffee[]
}