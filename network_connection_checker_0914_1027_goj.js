// 代码生成时间: 2025-09-14 10:27:56
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Events } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionChecker {
  private networkSubscription: Subscription;

  constructor(
    private platform: Platform,
    private network: Network,
    private events: Events
  ) {
    this.initializeNetworkListener();
  }

  /**
   * Initialize the network listener to monitor changes in network connection.
   */
  private initializeNetworkListener(): void {
    this.platform.ready().then(() => {
      this.networkSubscription = this.network.onChange().subscribe(
        (networkStatus: any) => {
          this.handleNetworkChange(networkStatus);
        },
        (error) => {
          console.error('Error occurred while checking network status', error);
        }
      );
    });
  }

  /**
   * Handle network status changes.
   * @param networkStatus - The current network status.
   */
  private handleNetworkChange(networkStatus: any): void {
    const isConnected = networkStatus.type !== 'none';
    this.events.publish('network:change', { isConnected });
    if (isConnected) {
      console.log('Network is connected.');
    } else {
      console.warn('Network is disconnected.');
    }
  }

  /**
   * Get the current network status.
   * @returns {Promise<boolean>} - Whether the device is currently connected to the network.
   */
  getNetworkStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.network.type().then((type) => {
        resolve(type !== 'none');
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * Destroy the network listener subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
