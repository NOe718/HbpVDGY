// 代码生成时间: 2025-09-01 20:44:03
// 导入必要的库
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.page.html',
  styleUrls: ['./excel-generator.page.scss'],
})
export class ExcelGeneratorPage {
  
  // Excel工作簿实例
  private workbook: ExcelJS.Workbook;

  // 构造函数
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.workbook = new ExcelJS.Workbook();
  }

  // 生成Excel文件的方法
  generateExcel(): void {
    try {
      // 创建一个工作表
      const worksheet = this.workbook.addWorksheet('My Sheet');
      
      // 添加一些数据
      worksheet.addRow(['Name', 'Age', 'City']);
      worksheet.addRow(['John Doe', 30, 'New York']);
      worksheet.addRow(['Jane Doe', 25, 'Los Angeles']);
      
      // 保存工作簿为文件
      this.workbook.xlsx.writeBuffer().then((buffer) => {
        // 使用浏览器API下载文件
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    } catch (error) {
      // 错误处理
      this.showErrorAlert('Error', 'Failed to generate Excel file.');
    }
  }

  // 显示错误警告框的方法
  private showErrorAlert(header: string, message: string): void {
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).present();
  }

  // 页面加载时调用的方法
  ionViewDidEnter(): void {
    this.showLoading();
    this.generateExcel().finally(() => this.hideLoading());
  }

  // 显示加载指示器的方法
  private showLoading(): void {
    const loading = this.loadingCtrl.create({
      message: 'Generating Excel file...'
    });
    loading.present();
  }

  // 隐藏加载指示器的方法
  private hideLoading(): void {
    const loading = this.loadingCtrl.getActive();
    if (loading) {
      loading.dismiss();
    }
  }
}
