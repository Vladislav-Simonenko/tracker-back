import { PartialType } from '@nestjs/mapped-types';
import { CreateClassSpellDto } from './create-cs.dto';

export class UpdateClassSpellDto extends PartialType(CreateClassSpellDto) {}
