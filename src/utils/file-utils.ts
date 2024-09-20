import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

export function generateFileName(
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: any, filename: string) => void,
) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  cb(null, `${uniqueSuffix}${ext}`);
}
