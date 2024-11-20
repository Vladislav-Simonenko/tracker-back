import { ApiProperty } from '@nestjs/swagger';

export class GetWPDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
