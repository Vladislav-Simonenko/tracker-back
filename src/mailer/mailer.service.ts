import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; // Импортируем MailerService
import { join } from 'path'; // Для работы с путями

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Метод для отправки email
  async sendEmail(
    to: string,
    subject: string,
    message: string,
    url: string,
  ): Promise<{ message: string }> {
    try {
      await this.mailerService.sendMail({
        to, // Адрес получателя
        subject, // Тема письма
        text: message, // Текст письма
        template: join(__dirname, '..', 'mailer', 'templates', 'conformation'), // Правильный путь к шаблону
        context: {
          name: to, // Пример: получатель
          url, // Пример: ссылка для подтверждения
        },
      });

      return { message: 'Сообщение отправлено успешно' };
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      throw new Error('Ошибка при отправке сообщения');
    }
  }
}
