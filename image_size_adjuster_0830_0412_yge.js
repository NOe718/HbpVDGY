// 代码生成时间: 2025-08-30 04:12:55
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
a class ImageSizeAdjusterService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private imageResizer: ImageResizer,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  // Opens file chooser to select images for resizing
  async chooseImages(): Promise<File[]> {
    await this.file.requestFileSystem();
    const options = {
      title: 'Select Images',
      multiple: true,
      maximumFiles: 5
    };
    return new Promise((resolve, reject) => {
      this.fileChooser.open(options, (result) => {
        if (result.length > 0) {
          resolve(result);
        } else {
          reject('No images selected');
        }
      });
    });
  }

  // Resizes selected images to the specified dimensions
  resizeImages(files: File[], outputWidth: number, outputHeight: number): Observable<any> {
    return new Observable(subscriber => {
      const resizePromises = files.map(file => this.resizeImage(file, outputWidth, outputHeight));
      Promise.all(resizePromises).then(() => {
        subscriber.next();
        subscriber.complete();
      }).catch(error => {
        subscriber.error(error);
      });
    });
  }

  // Resizes a single image file
  private resizeImage(file: File, outputWidth: number, outputHeight: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imageResizer.resize(file.nativeURL, outputWidth, outputHeight,
        '/storage/emulated/0/Download/resized_image.jpg',
        'JPEG', 100, (result) => {
          if (result) {
            resolve();
          } else {
            reject('Failed to resize image');
          }
        }).catch(error => {
        reject(error);
      });
    });
  }

  // Displays a loading spinner while resizing images
  async showLoadingIndicator(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Resizing images...'
    });
    await loading.present();
    return loading;
  }

  // Displays a toast message after resizing images
  async showToastMessage(message: string): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    await toast.present();
    return toast;
  }
}

/*
 * This module provides a service for adjusting the size of multiple images using the IONIC framework.
 * It includes functionality for selecting images, resizing them, and displaying loading indicators and toast messages.
 *
 * @author Your Name
 * @version 1.0.0
 */
