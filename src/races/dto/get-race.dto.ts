import { ApiProperty } from '@nestjs/swagger';

export class GetRaceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  speed: number;
}
