import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';                                                                         

@Component({
  selector: 'app-image-segmentation',
  templateUrl: './image-segmentation.component.html',
  styleUrls: ['./image-segmentation.component.scss']
})

export class ImageSegmentationComponent {
    selectedFile: File | null = null;                                                                                        
    processedImageUrl: string | null = null;                                                                                 
                                                                                                                              
    constructor(private http: HttpClient) {}                                                                                 
                                                                                                                              
    onFileSelected(event: any) {                                                                                             
      this.selectedFile = event.target.files[0];                                                                             
    }                                                                                                                        
                                                                                                                                  
    onUpload() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
            this.http.post('http://localhost:3000/api/segment-image', formData, { responseType: 'blob' })
              .subscribe((response: Blob) => {
                  this.processedImageUrl = URL.createObjectURL(response);
            });
        }
    }
}
