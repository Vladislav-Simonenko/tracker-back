import { ApiProperty } from '@nestjs/swagger';

export class GetWorldDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sources: string[];
}
