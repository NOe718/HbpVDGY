// 代码生成时间: 2025-08-06 09:11:45
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

/**
 * NetworkStatusCheckerService checks the network connection status and provides callbacks for changes.
 */
@Injectable({
  providedIn: 'root'
})
export class NetworkStatusCheckerService {
  private networkSubscription: Subscription;
  private isConnected: boolean = navigator.onLine;

  /**
   * Inject Network and Platform services.
   * @param network Network service from @ionic-native/network.
   * @param platform Platform service from @ionic/angular.
   */
  constructor(private network: Network, private platform: Platform) {
    this.initializeNetworkListener();
  }

  /**
   * Initialize network listener to monitor changes in network status.
   */
  private initializeNetworkListener(): void {
    this.networkSubscription = this.network.onChange().subscribe(
      (networkState: any) => {
        this.isNetworkConnected(networkState);
      },
      (error: any) => {
        console.error('Network status error:', error);
      }
    );
  }

  /**
   * Check if the network is connected based on the state received from the network service.
   * @param networkState The state received from the network service.
   */
  private isNetworkConnected(networkState: any): void {
    // Check if the network status is 'online' or 'wifi' or 'bluetooth'
    if (networkState.type === 'wifi' || networkState.type === 'bluetooth' || networkState.type === 'other') {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
  }

  /**
   * Public method to check the current network connection status.
   * @returns {boolean} True if connected, false otherwise.
   */
  public isNetworkConnected(): boolean {
    return this.isConnected;
  }

  /**
   * ngOnDestroy is called when this service is destroyed.
   * We need to unsubscribe to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
