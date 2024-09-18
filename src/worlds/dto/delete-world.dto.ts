import { ApiProperty } from '@nestjs/swagger';

export class DeleteWorldDto {
  @ApiProperty()
  id: number;
}
