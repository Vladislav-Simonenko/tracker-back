import { ApiProperty } from '@nestjs/swagger';

export class CreateRuleDto {
  @ApiProperty({
    description: 'The name of the rule',
    example: 'string',
  })
  name: string;
  @ApiProperty({
    description: 'Description of the item',
    example: 'string',
  })
  description: string;
}
