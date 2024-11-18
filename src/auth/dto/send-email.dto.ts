import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ description: 'Email получателя' })
  to: string;

  @ApiProperty({ description: 'Тема письма' })
  subject: string;

  @ApiProperty({ description: 'Текст письма' })
  message: string;
}
