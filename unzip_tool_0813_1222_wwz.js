// 代码生成时间: 2025-08-13 12:22:02
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Zip } from '@ionic-native/zip';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-unzip',
  templateUrl: 'unzip.html',
})
export class UnzipPage {
  private zipFileUri: string;
  private extractedFolderUri: string;
  private fileSystem: string = 'file://';
  private fileName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public platform: Platform,
              public file: File,
              public sanitizer: DomSanitizer) {
    // Get file name from NavParams
    this.fileName = navParams.get('fileName');
    // Set zip file URI
    this.setZipFileUri();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnzipPage');
  }

  /**
   * Set zip file URI based on Ionic platform
   */
  setZipFileUri() {
    if (this.platform.is('cordova')) {
      this.zipFileUri = this.fileSystem + this.file.dataDirectory + this.fileName;
    } else {
      this.zipFileUri = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/' + this.fileName);
    }
  }

  /**
   * Extract zip file
   */
  unzipFile() {
    let loading = this.loadingCtrl.create({ content: 'Unzipping...' });
    loading.present();

    this.zip.unzip(this.zipFileUri)
      .then((result: any) => {
        this.extractedFolderUri = result;
        loading.dismiss();
        this.showToast('File extracted successfully');
      }, (err: any) => {
        loading.dismiss();
        this.showToast('Error: ' + err.message);
      });
  }

  /**
   * Show toast message
   */
  showToast(message: string) {
    let toast = this.toastCtrl.create({ message: message, duration: 3000 });
    toast.present();
  }
}

// Usage of @ionic-native/zip plugin requires adding it to your project
// and properly installing it via Cordova or Capacitor.
// Make sure to handle permissions and other platform-specific configurations.

// This code assumes that the zip file is either in the device's local storage
// or in the assets folder of the Ionic project, depending on whether the app
// is running on a device or in a web environment.

// The `unzipFile` function uses the @ionic-native/zip plugin to unzip
// the file and handles success and error cases by showing a toast message.

// Error handling is done by catching any errors thrown during the unzip
// process and displaying them in a toast message.
