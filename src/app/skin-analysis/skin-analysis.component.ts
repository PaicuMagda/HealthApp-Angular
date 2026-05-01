import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skin-analysis',
  standalone: true,
  imports: [NgIf, NgClass, UpperCasePipe, NgFor],
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
    formData.append('file', this.selectedFile);

    fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.result = data.top3.map((item: any) => ({
          ...item,
          confidence: (item.confidence * 100).toFixed(2),
        }));
      })
      .catch((err) => console.error(err));
  }

  getBarClass(conf: string) {
    const value = Number(conf);

    if (value > 80) return 'high';
    if (value > 50) return 'medium';
    return 'low';
  }
}
