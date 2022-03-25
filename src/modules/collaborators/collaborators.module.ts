import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entity/collaborator.entity';
import { CollaboratorsController } from './collaborators.controller';
import { Sectors } from './entity/sectors.entity';
import { CpfValidation } from 'src/common/validate-cpf';

@Module({
  imports: [TypeOrmModule.forFeature([Collaborator, Sectors])],
  providers: [CollaboratorsService, CpfValidation],
  controllers: [CollaboratorsController],
})
export class CollaboratorsModule {}
