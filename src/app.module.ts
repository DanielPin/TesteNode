import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CollaboratorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
