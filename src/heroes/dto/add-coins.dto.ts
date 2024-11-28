import { ApiPropertyOptional } from '@nestjs/swagger';

export class AddCoinsDto {
  @ApiPropertyOptional({
    description: 'copper_coins',
    example: 12,
  })
  copper?: number;

  @ApiPropertyOptional({
    description: 'silver_coins',
    example: 12,
  })
  silver?: number;

  @ApiPropertyOptional({
    description: 'electrum_coins',
    example: 12,
  })
  electrum?: number;

  @ApiPropertyOptional({
    description: 'gold_coins',
    example: 12,
  })
  gold?: number;

  @ApiPropertyOptional({
    description: 'platinum_coins',
    example: 12,
  })
  platinum?: number;
}
