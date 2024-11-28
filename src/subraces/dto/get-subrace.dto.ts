import { ApiProperty } from '@nestjs/swagger';

export class GetSubraceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  race_id: number;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  speed: number;

  @ApiProperty()
  features_done: true;
}
