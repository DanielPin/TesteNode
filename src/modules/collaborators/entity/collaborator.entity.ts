import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Sectors } from './sectors.entity';

@Entity('colaboradores')
export class Collaborator {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'cpf' })
  cpf: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'telefone' })
  telephone: string;

  @ManyToOne(() => Sectors, () => Collaborator)
  @JoinColumn({ name: 'setor_id' })
  sector: Sectors;
}
