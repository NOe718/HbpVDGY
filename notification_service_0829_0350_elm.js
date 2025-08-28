// 代码生成时间: 2025-08-29 03:50:49
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private platform: Platform,
    private navCtrl: NavController
  ) {}

  // Displays an alert to the user with a given message and title
  async showAlert(message: string, title: string): Promise<void> {
    try {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error presenting alert:', error);
    }
  }

  // Displays a toast notification to the user with a given message
  async showToast(message: string): Promise<void> {
    try {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000, // Toast duration in ms
        position: 'bottom'
      });
      await toast.present();
    } catch (error) {
      console.error('Error presenting toast:', error);
    }
  }

  // Navigates to a specified page
  async navigateToPage(page: string): Promise<void> {
    try {
      await this.navCtrl.navigateForward(page);
    } catch (error) {
      console.error('Error navigating to page:', error);
    }
  }
}
