import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  listOfTestCollaborator,
  aTestCollaborator,
  createTestColaborator,
  createCollaboratorWithInvalidCpf,
  createCollaboratorWithInvalidSector,
} from '../../common/test.util';
import { CpfValidation } from '../../common/validate-cpf';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './entity/collaborator.entity';
import { Sectors } from './entity/sectors.entity';

describe('ColaboradoresService', () => {
  let service: CollaboratorsService;

  const mockRepository = {
    createQueryBuilder: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockRepositorySetores = {
    findOne: jest.fn(),
  };

  const collaboratorsExpected = {
    Administracao: [{ email: 'mario@teste.com', telefone: '11999999999' }],
    Tecnologia: [
      { email: 'mick@teste.com', telefone: '11999999998' },
      { email: 'emerson@teste.com', telefone: '11999999997' },
    ],
    Financeiro: [{ email: 'mick@teste.com', telefone: '11999999996' }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollaboratorsService,
        {
          provide: getRepositoryToken(Collaborator),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Sectors),
          useValue: mockRepositorySetores,
        },
        CpfValidation,
        Sectors,
      ],
    }).compile();

    service = module.get<CollaboratorsService>(CollaboratorsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Teste de Colaboradores sem erro', () => {
    it('Listar Colaboradores', async () => {
      mockRepository.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnValue(listOfTestCollaborator),
      }));

      const collaborator = await service.findAll();
      expect(collaborator).toEqual(collaboratorsExpected);
    });

    it('Buscar colaborador por cpf', async () => {
      mockRepository.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(aTestCollaborator),
      }));
      const collaborator: Collaborator = await service.findByCpf('22222222222');
      expect(collaborator).toEqual(aTestCollaborator);
    });

    it('Deletar colaborador', async () => {
      mockRepository.remove.mockReturnValue(aTestCollaborator);
      const collaborator: Collaborator = await service.delete('22222222222');
      expect(collaborator).toEqual(aTestCollaborator);
    });

    it('Criar colaborador', async () => {
      mockRepository.save.mockReturnValue(createTestColaborator);

      mockRepositorySetores.findOne.mockReturnValue(true);
      mockRepository.findOne.mockReturnValue(null);
      const collaborator: Collaborator = await service.create(
        createTestColaborator,
      );
      expect(collaborator).toEqual(createTestColaborator);
    });
  });

  describe('Teste de Colaboradores com erro', () => {
    it('Cadastrar usuario com cpf invalido', async () => {
      await expect(
        service.create(createCollaboratorWithInvalidCpf),
      ).rejects.toThrow(BadRequestException);
    });

    it('Cadastrar usuario com setor invalido', async () => {
      mockRepositorySetores.findOne.mockReturnValue(null);

      await expect(
        service.create(createCollaboratorWithInvalidSector),
      ).rejects.toThrow(BadRequestException);
    });

    it('Cadastrar usuario já existente na base', async () => {
      mockRepositorySetores.findOne.mockReturnValue(true);
      mockRepository.findOne.mockReturnValue(createTestColaborator);

      await expect(service.create(createTestColaborator)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('Buscar colaborador que não existe na base', async () => {
      mockRepository.createQueryBuilder = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis(),
        getOne: jest.fn(() => null),
      }));

      await expect(service.findByCpf('22222222222')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
