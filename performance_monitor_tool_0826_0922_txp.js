// 代码生成时间: 2025-08-26 09:22:17
// performance_monitor_tool.js
// This file contains the code for a system performance monitoring tool using Ionic framework

const { Diagnostic } = require('@ionic-native/diagnostic/ngx');
const { Platform } = require('@ionic/angular');
const { Injectable } = require('@angular/core');

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitorService {

  constructor(private diagnostic: Diagnostic, private platform: Platform) {
  }

  // Checks if the device is rooted
  async isDeviceRooted(): Promise<boolean> {
    try {
      return await this.diagnostic.isDeviceRooted();
    } catch (error) {
      console.error('Error checking if device is rooted:', error);
      throw error;
    }
  }

  // Checks if the app is running in the background
  async isAppInBackground(): Promise<boolean> {
    try {
      return await this.diagnostic.isAppInBackground();
    } catch (error) {
      console.error('Error checking if app is in background:', error);
      throw error;
    }
  }

  // Checks if the app has location permissions
  async hasLocationPermission(): Promise<boolean> {
    try {
      const permission = await this.diagnostic.getLocationAuthorizationStatus();
      return permission === this.diagnostic.permissionStatus.GRANTED;
    } catch (error) {
      console.error('Error checking location permission:', error);
      throw error;
    }
  }

  // Starts monitoring CPU usage
  async monitorCPU(): Promise<number> {
    try {
      const info = await this.diagnostic.getCPU();
      return info.usage;
    } catch (error) {
      console.error('Error monitoring CPU usage:', error);
      throw error;
    }
  }

  // Starts monitoring memory usage
  async monitorMemory(): Promise<number> {
    try {
      const info = await this.diagnostic.getMemory();
      return info.free;
    } catch (error) {
      console.error('Error monitoring memory usage:', error);
      throw error;
    }
  }

  // Starts monitoring battery level
  async monitorBattery(): Promise<number> {
    try {
      const info = await this.diagnostic.getBattery();
      return info.level;
    } catch (error) {
      console.error('Error monitoring battery level:', error);
      throw error;
    }
  }

  // Starts monitoring network information
  async monitorNetwork(): Promise<{
    mobile: boolean,
    wifi: boolean,
    connected: boolean,
    type: string
  }> {
    try {
      const info = await this.diagnostic.getNetworkInformation();
      return {
        mobile: info.mobile,
        wifi: info.wifi,
        connected: info.connected,
        type: info.type
      };
    } catch (error) {
      console.error('Error monitoring network information:', error);
      throw error;
    }
  }

  // Starts monitoring device orientation
  async monitorOrientation(): Promise<string> {
    try {
      return this.platform.is('cordova') ? this.diagnostic.getDeviceOrientation() : 'Not supported';
    } catch (error) {
      console.error('Error monitoring device orientation:', error);
      throw error;
    }
  }
}
