import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { uploadSchema } from './shema/upload.shema';

@ApiTags('upload')
@Controller('/api/upload')
export class UploadController {
  @Post('icon')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image file',
    type: 'multipart/form-data',
    schema: uploadSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadIcon(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
    return res.status(200).json({
      url: `/images/${file.filename}`,
    });
  }
}
