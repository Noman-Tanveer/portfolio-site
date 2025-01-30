import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';                                                                         

@Component({
  selector: 'app-image-segmentation',
  templateUrl: './image-segmentation.component.html',
  styleUrls: ['./image-segmentation.component.scss']
})

export class ImageSegmentationComponent {
    selectedFile: File | null = null;
    uploadedImageUrl: string | null = null;
    processedImageUrl: string | null = null;

    constructor(private http: HttpClient) {}

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            this.uploadedImageUrl = URL.createObjectURL(this.selectedFile);
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        // Add visual feedback for drag over
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        // Remove visual feedback for drag leave
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            this.selectedFile = event.dataTransfer.files[0];
            event.dataTransfer.clearData();
        }
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
