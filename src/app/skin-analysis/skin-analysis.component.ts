import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skin-analysis',
  standalone: true,
  imports: [NgIf],
  templateUrl: './skin-analysis.component.html',
  styleUrl: './skin-analysis.component.scss',
})
export class SkinAnalysisComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  result: any = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  analyzeImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    console.log('Send to AI backend');
  }
}
