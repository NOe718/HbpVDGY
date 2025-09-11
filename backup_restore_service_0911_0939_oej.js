// 代码生成时间: 2025-09-11 09:39:55
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackupRestoreService {
  private backupFile: string = 'backup.json';
  private backupFolderPath: string;
  private restoreFolderPath: string;
  private appStoragePath: string;

  constructor(
    private storage: Storage,
    private file: File,
    private filePath: FilePath,
    private platform: Platform,
    private toastCtrl: ToastController
  ) {
    this.initializePaths();
  }

  // Initialize file paths for backup and restore
  initializePaths() {
    this.backupFolderPath = this.filePath.dataDirectory + 'backup/';
    this.restoreFolderPath = this.filePath.dataDirectory + 'restore/';
    this.appStoragePath = this.platform.is('cordova') ? this.file.externalRootDirectory : this.file.dataDirectory;
  }

  // Perform backup of the data
  async backupData(data) {
    try {
      const fileTransfer = this.file.createFile(this.backupFolderPath, this.backupFile, { replace: true });
      await fileTransfer.write(JSON.stringify(data), true);
      // Show backup success message
      this.showToast('Data backup successful');
    } catch (error) {
      console.error('Backup failed:', error);
      // Show backup error message
      this.showToast('Data backup failed');
    }
  }

  // Restore data from the backup file
  async restoreData() {
    try {
      const fileTransfer = this.file.checkFile(this.backupFolderPath, this.backupFile);
      if (!fileTransfer) {
        throw new Error('Backup file not found');
      }
      const file = this.file.resolveLocalFilesystemUrl(fileTransfer.nativeURL);
      const fileData = await this.file.readAsText(file.nativeURL);
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Restore failed:', error);
      // Show restore error message
      this.showToast('Data restore failed');
      return null;
    }
  }

  // Show a toast message
  async showToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
