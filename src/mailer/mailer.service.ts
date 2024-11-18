import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

const EMAIL_SUBJECT = 'Завершение регистрации в DnD Tracker.';
const TEMPLATE_PATH = join(
  __dirname,
  '..',
  'mailer',
  'templates',
  'conformation',
);

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({
    to,
    subject,
    message,
    url,
  }: {
    to: string;
    subject: string;
    message: string;
    url: string;
  }): Promise<{ message: string }> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: EMAIL_SUBJECT,
        text: message,
        template: TEMPLATE_PATH,
        context: {
          subject,
          message,
          url,
        },
      });

      return { message: 'Сообщение отправлено успешно' };
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      throw new Error('Ошибка при отправке сообщения');
    }
  }
}
