import { ApiProperty } from '@nestjs/swagger';

export class GetItemByIdDto {
  @ApiProperty({})
  id: string;
}
