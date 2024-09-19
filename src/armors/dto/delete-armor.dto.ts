import { ApiProperty } from '@nestjs/swagger';

export class DeleteArmorDto {
  @ApiProperty({
    description: 'ID of the armor',
    example: 1,
  })
  id: BigInt;
}
