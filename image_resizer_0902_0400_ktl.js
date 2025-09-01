// 代码生成时间: 2025-09-02 04:00:37
// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Transfer, TransferObject } from '@ionic-native/transfer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImageResizerService {

  private resizeServiceUrl: string = 'https://example.com/resize'; // URL to the resize service
  private targetWidth: number = 800; // Target width for resizing
  private targetHeight: number = 600; // Target height for resizing

  constructor(
    private file: File,
    private filePath: FilePath,
    private camera: Camera,
    private transfer: TransferObject,
    private fileTransfer: FileTransfer,
    private fileOpener: FileOpener
  ) {}

  /**
   * Takes a picture using the device camera.
   *
   * @returns Promise<MediaFile> - The captured image file.
   */
  public takePicture(): Promise<MediaFile> {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return this.camera.getPicture(options).then((imageData) => {
      return this.file.resolveLocalFilesystemURL(imageData).then((fileEntry) => {
        return {
          name: fileEntry.name,
          path: imageData
        } as MediaFile;
      });
    }, (err) => {
      console.error('Camera error:', err);
    });
  }

  /**
   * Resizes an image to the specified dimensions.
   *
   * @param file - The image file to resize.
   * @param width - The desired width.
   * @param height - The desired height.
   * @returns Promise<any> - The resized image data.
   */
  public resizeImage(file: MediaFile, width: number, height: number): Promise<any> {
    this.targetWidth = width;
    this.targetHeight = height;

    return this.fileOpener.open(file.path, 'image/jpeg');
  }

  /**
   * Uploads the image to a remote server for resizing.
   *
   * @param file - The image file to upload.
   * @returns Promise<any> - The upload response.
   */
  public uploadImageForResize(file: MediaFile): Promise<any> {
    const fileTransfer: TransferObject = this.transfer.create();

    const options = {
      key: 'file',
      fileName: file.name,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      params: {
        width: this.targetWidth,
        height: this.targetHeight
      }
    };

    fileTransfer.upload(file.path, this.resizeServiceUrl, options)
      .then((result) => {
        console.log('Image upload success:', result.response);
      }, (err) => {
        console.error('Image upload error:', err);
      });
  }
}

/**
 * MediaFile Interface
 *
 * @interface MediaFile
 */
interface MediaFile {
  name: string;
  path: string;
}
