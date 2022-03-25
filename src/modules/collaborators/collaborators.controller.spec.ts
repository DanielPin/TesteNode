import { Test, TestingModule } from '@nestjs/testing';
import {
  listOfTestCollaborator,
  aTestCollaborator,
  createTestColaborator,
} from '../../common/test.util';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './entity/collaborator.entity';

describe('ColaboradoresController', () => {
  let collaboratorsController: CollaboratorsController;

  const mockRepository = {
    create: jest.fn().mockReturnValue(createTestColaborator),
    findAll: jest.fn().mockReturnValue(listOfTestCollaborator),
    findByCpf: jest.fn().mockReturnValue(aTestCollaborator),
    delete: jest.fn().mockReturnValue(aTestCollaborator),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollaboratorsController],
      providers: [
        {
          provide: CollaboratorsService,
          useValue: mockRepository,
        },
      ],
    }).compile();

    collaboratorsController = module.get<CollaboratorsController>(
      CollaboratorsController,
    );
  });

  it('listarColaboradores', async () => {
    const collaborators = await collaboratorsController.listCollaborators();
    expect(collaborators).toEqual(listOfTestCollaborator);
  });

  it('buscarColaboradorPorCpf', async () => {
    const collaborators: Collaborator =
      await collaboratorsController.searchByCpf('22222222222');
    expect(collaborators).toEqual(aTestCollaborator);
  });

  it('cadastrarColaborador', async () => {
    const collaborators = await collaboratorsController.createCollaborator(
      createTestColaborator,
    );
    expect(collaborators).toEqual(createTestColaborator);
  });

  it('excluir colaborador', async () => {
    const collaborators: Collaborator =
      await collaboratorsController.deleteCollaborator('22222222222');
    expect(collaborators).toEqual(aTestCollaborator);
  });
});
