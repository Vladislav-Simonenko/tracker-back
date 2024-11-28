import { ApiProperty } from '@nestjs/swagger';

export class GetHealingDto {
  @ApiProperty({
    description: 'Healing value',
    example: 20,
  })
  healing: number;
}

export class AddTempHpDto {
  @ApiProperty({
    description: 'Количество временных хп для добавления',
    example: 15,
  })
  tempHp: number;
}

export class AddBuffHpDto {
  @ApiProperty({
    description: 'Количество баффированных хп для добавления',
    example: 20,
  })
  buffHp: number;
}
