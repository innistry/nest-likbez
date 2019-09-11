import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class PhotoMetadata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    height: number;

    @Column('int')
    width: number;

    @Column()
    orientation: string;

    @Column()
    compressed: boolean;

    @Column()
    comment: string;

    @OneToOne(type => Photo, photo => photo.metadata)
    photo: Photo;
}
