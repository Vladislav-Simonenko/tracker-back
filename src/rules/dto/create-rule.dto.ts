import { ApiProperty } from '@nestjs/swagger';

export class CreateRuleDto {
  @ApiProperty({
    example: 'string',
    description: 'Rule id',
  })
  id: string;
  @ApiProperty({
    example: 'string',
    description: 'Rule name',
  })
  name: string;
  @ApiProperty({
    example: 'string',
    description: 'Rule description',
  })
  description: string;
}
