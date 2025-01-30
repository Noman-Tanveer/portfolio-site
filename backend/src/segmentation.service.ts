import { Injectable } from '@nestjs/common';                                                                                    

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class SegmentationService {
  constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

  async saveImage(file: Express.Multer.File): Promise<Image> {
    const createdImage = new this.imageModel({
      data: file.buffer,
      contentType: file.mimetype,
    });
    return createdImage.save();
  }
}
