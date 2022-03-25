import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDTO } from './dto/create-collaborator.dto';

@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorService: CollaboratorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCollaborator(@Body() createCollaborator: CreateCollaboratorDTO) {
    return this.collaboratorService.create(createCollaborator);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listCollaborators() {
    return this.collaboratorService.findAll();
  }

  @Get(':cpf')
  @HttpCode(HttpStatus.OK)
  searchByCpf(@Param('cpf') cpf: string) {
    return this.collaboratorService.findByCpf(cpf);
  }

  @Delete(':cpf')
  @HttpCode(HttpStatus.OK)
  deleteCollaborator(@Param('cpf') cpf: string) {
    return this.collaboratorService.delete(cpf);
  }
}
