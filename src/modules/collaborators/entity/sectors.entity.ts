import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Collaborator } from './collaborator.entity';

@Entity('setores')
export class Sectors {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'descricao' })
  description: string;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.sector)
  collaborators: Collaborator;
}
