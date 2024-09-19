import { ApiProperty } from '@nestjs/swagger';

export class DeleteRuleDto {
  @ApiProperty()
  id: number;
}
