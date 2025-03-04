import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileConversion } from '../../../Model/file-Conversion';


@Component({
  selector: 'app-upload',
 standalone : false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  constructor(private http: HttpClient, private fileread : FileConversion) {}

  imageName: string = '';

  // Function to handle image file input
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertToJson(file);
    }
  }


  private convertToJson(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.imageName = reader.result as string;
      
      const imageJson = {
        image_data: this.imageName
      };
      
      console.log('Image JSON ....:', imageJson);

      this.http.post('https://angulardatabase-63cfe-default-rtdb.firebaseio.com/Image.json',imageJson).subscribe(()=>{
        console.log('uploaded....');
        
      })


    };

    // Read the file as a data URL (base64)
    reader.readAsDataURL(file);
    
  }


  imageJson = {
    image_data: "" };

  convertJsonToImage() {
    const base64Image = this.imageJson.image_data;

    // Create an image element
    const img = new Image();
    img.src = base64Image;

    // Append the image to the document body or any element
    img.onload = () => {
      // Here, we are appending it to the DOM
      document.body.appendChild(img);
    };
  }

  // Method to download the image as a file
  downloadImage() {
    const base64Image = this.imageJson.image_data;
    const a = document.createElement('a');
    a.href = base64Image;
    a.download = 'image.png'; // You can change the file name and extension as needed
    a.click();
  }
}
