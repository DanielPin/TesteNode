import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpfValidation } from '../../common/validate-cpf';
import { CreateCollaboratorDTO } from './dto/create-collaborator.dto';
import { Collaborator } from './entity/collaborator.entity';
import { Sectors } from './entity/sectors.entity';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
    private cpfValidator: CpfValidation,
    @InjectRepository(Sectors)
    private sectorRepository: Repository<Sectors>,
  ) {}

  async create(createCollaborator: CreateCollaboratorDTO) {
    await this.validateSector(Number(createCollaborator.sector.id));

    await this.validateCpf(createCollaborator.cpf);

    createCollaborator.cpf = await this.replaceCpf(createCollaborator.cpf);

    const collaboratorExists: Collaborator =
      await this.collaboratorRepository.findOne({
        where: { cpf: createCollaborator.cpf },
      });

    if (collaboratorExists) {
      throw new BadRequestException('Colaborador já existe');
    }

    return this.collaboratorRepository.save(createCollaborator);
  }

  async findAll() {
    const collaborators: Collaborator[] = await this.collaboratorRepository
      .createQueryBuilder('colaboradores')
      .select([
        'colaboradores.name',
        'colaboradores.email',
        'setores.descricao',
      ])
      .innerJoinAndSelect('colaboradores.sector', 'setores')
      .getMany();

    const groupedCollaborators = collaborators.reduce(
      (newFormattedObject, data) => {
        newFormattedObject[data.sector.description] =
          newFormattedObject[data.sector.description] || [];
        newFormattedObject[data.sector.description].push({
          email: data.email,
          telefone: data.telephone,
        });
        return newFormattedObject;
      },
      {},
    );

    return groupedCollaborators;
  }

  async findByCpf(cpf: string) {
    await this.validateCpf(cpf);

    const collaborator: Collaborator = await this.collaboratorRepository
      .createQueryBuilder('colaboradores')
      .select([
        'colaboradores.id',
        'colaboradores.name',
        'colaboradores.email',
        'colaboradores.cpf',
        'setores.descricao',
      ])
      .innerJoinAndSelect('colaboradores.sector', 'setores')
      .where('colaboradores.cpf = :cpf', { cpf: cpf })
      .getOne();

    if (!collaborator) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    return collaborator;
  }

  async delete(cpf: string) {
    const collaborator: Collaborator = await this.findByCpf(cpf);

    return this.collaboratorRepository.remove(collaborator);
  }

  async validateCpf(cpf: string) {
    const validCpf: boolean = await this.cpfValidator.execute(cpf);

    if (!validCpf) {
      throw new BadRequestException('Cpf inválido');
    }
  }

  async replaceCpf(cpf: string) {
    return cpf.replace('.', '').replace('.', '').replace('-', '');
  }

  async validateSector(id: number) {
    const sector: Sectors = await this.sectorRepository.findOne(id);

    if (!sector) {
      throw new BadRequestException('Setor inválido');
    }
    return true;
  }
}
