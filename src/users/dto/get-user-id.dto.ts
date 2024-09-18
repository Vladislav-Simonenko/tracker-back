import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty()
  id: string;
}
