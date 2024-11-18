import { ApiProperty } from '@nestjs/swagger';

export class GetHeroByIdDto {
  @ApiProperty()
  id: number;
}
