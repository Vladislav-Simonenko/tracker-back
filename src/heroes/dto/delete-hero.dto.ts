import { ApiProperty } from '@nestjs/swagger';

export class DeleteHeroDto {
  @ApiProperty()
  id: number;
}
