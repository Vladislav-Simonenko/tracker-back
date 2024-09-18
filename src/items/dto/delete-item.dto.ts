import { ApiProperty } from '@nestjs/swagger';

export class DeleteItemDto {
  @ApiProperty()
  id: string;
}
