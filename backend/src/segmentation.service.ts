import { Injectable } from '@nestjs/common';                                                                                    

@Injectable()
export class SegmentationService {
  constructor(@InjectModel(Image.name)) {}

  async saveImage(file: Express.Multer.File): Promise<Image> {
    file.saveImage(Image.name)
  }
}
