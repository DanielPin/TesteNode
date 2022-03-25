import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SectorsDto } from './sectors.dto';

export class CreateCollaboratorDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  telephone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  cpf: string;

  sector: SectorsDto;
}
