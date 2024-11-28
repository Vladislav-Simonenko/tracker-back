import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';
import { GetHeroDto } from 'src/heroes/dto/get-hero.dto';

export class GetUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [GetHeroDto] })
  heroes: GetHeroDto[];
}
