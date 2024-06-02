import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DmsService } from './dms.service';
import { Express } from 'express';
import 'multer';
@Controller('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @Post('/file')  
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
  ) {
    const isPublicBool = isPublic === 'true' ? true : false;
    const result = await this.dmsService.uploadSingleFile({
      file,
      isPublic: isPublicBool,
    });
    return { message: 'File uploaded successfully', result: result };
  }

  @Get(':key')
  async getFileUrl(@Param('key') key: string) {
    const result = this.dmsService.getFileUrl(key);
    return;
  }

  @Get('/signed-url/:key')
  async getSingedUrl(@Param('key') key: string) {
    return this.dmsService.getPresignedSignedUrl(key);
  }

  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    return this.dmsService.deleteFile(key);
  }
}
