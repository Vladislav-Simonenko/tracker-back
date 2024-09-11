//появится позже
// import { Injectable } from '@nestjs/common';
// import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

// @Injectable()
// export class MailerService {
//   constructor(private mailerService: NestMailerService) {}

//   async sendVerificationEmail(email: string, token: string) {
//     const url = `http://localhost:4000/auth/verify?token=${token}`;

//     await this.mailerService.sendMail({
//       to: email,
//       subject: 'Verify your email',
//       template: './verification',
//       context: { url },
//     });
//   }
// }
