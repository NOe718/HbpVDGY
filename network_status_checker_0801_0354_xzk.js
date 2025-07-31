// 代码生成时间: 2025-08-01 03:54:16
// network_status_checker.js
// This script checks the network connection status using Ionic framework's Network module.

import { Network } from '@ionic-native/network/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusCheckerService {

  constructor(private network: Network) {
    // Listen to network status changes
    this.listenToNetwork();
  }

  // Function to check the network connection status
  checkConnection() {
    return new Promise((resolve, reject) => {
      this.network.onConnect().subscribe(() => {
        console.log('Network connected!');
        resolve('connected');
      }, (err) => {
        console.error('Error occurred:', err);
        reject(err);
      });

      this.network.onDisconnect().subscribe(() => {
        console.log('Network disconnected!');
        resolve('disconnected');
      }, (err) => {
        console.error('Error occurred:', err);
        reject(err);
      });
    });
  }

  // Function to start listening to network changes
  private listenToNetwork() {
    this.network.initialize().then(() => {
      // Check the current network status
      this.checkConnection().then(status => {
        console.log('Current network status:', status);
      }).catch(error => {
        console.error('Failed to check network status:', error);
      });
    }).catch(err => {
      console.error('Failed to initialize Network module:', err);
    });
  }
}
