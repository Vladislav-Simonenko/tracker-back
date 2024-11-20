import { ApiProperty } from '@nestjs/swagger';

export class GetArmorDto {
  @ApiProperty()
  name_rus: string;

  @ApiProperty()
  name_eng: string;

  @ApiProperty()
  type: number;

  @ApiProperty()
  base_ac: string;

  @ApiProperty()
  ac: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  disadvantage: true;

  @ApiProperty()
  requirement: string;

  @ApiProperty()
  homebrew: true;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  id: string;
}
