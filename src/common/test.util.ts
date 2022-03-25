import { CreateCollaboratorDTO } from 'src/modules/collaborators/dto/create-collaborator.dto';

export const listOfTestCollaborator = [
  {
    nome: 'Mario a Silva',
    email: 'mario@teste.com',
    telefone: '11999999999',
    setor: { id: 1, descricao: 'Administracao' },
  },
  {
    nome: 'Mick da Silva',
    email: 'mick@teste.com',
    telefone: '11999999998',
    setor: { id: 2, descricao: 'Tecnologia' },
  },
  {
    nome: 'Emerson da Silva',
    email: 'emerson@teste.com',
    telefone: '11999999997',
    setor: { id: 2, descricao: 'Tecnologia' },
  },
  {
    nome: 'Mick da Silva',
    email: 'mick@teste.com',
    telefone: '11999999996',
    setor: { id: 3, descricao: 'Financeiro' },
  },
];

export const aTestCollaborator = {
  id: 1,
  nome: 'Mick da Silva',
  email: 'mick@teste.com',
  cpf: '22222222222',
  telephone: '11999999996',
  setor: { id: 3, descricao: 'Financeiro' },
};

export const createTestColaborator: CreateCollaboratorDTO = {
  name: 'Mick da Silva',
  email: 'mick@teste.com',
  cpf: '22222222222',
  telephone: '11999999996',
  sector: { id: '3', description: 'Financeiro' },
};

export const createCollaboratorWithInvalidCpf: CreateCollaboratorDTO = {
  name: 'Mick da Silva',
  email: 'mick@teste.com',
  cpf: '222222222',
  telephone: '11999999996',
  sector: { id: '3', description: 'Financeiro' },
};

export const createCollaboratorWithInvalidSector: CreateCollaboratorDTO = {
  name: 'Mick da Silva',
  email: 'mick@teste.com',
  cpf: '22222222222',
  telephone: '11999999996',
  sector: { id: '9', description: 'CEO' },
};
