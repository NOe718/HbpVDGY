// 代码生成时间: 2025-08-05 12:27:24
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusCheckerService {
  
  // 构造函数注入Platform和Network服务
  constructor(private platform: Platform, private network: Network) {
    this.platform.ready().then(() => {
      this.initializeNetworkListener();
    });
# TODO: 优化性能
  }
# FIXME: 处理边界情况

  // 初始化网络监听器
  private initializeNetworkListener(): void {
    this.network.onConnect().subscribe(() => {
      console.log('Network connected!');
    });
    this.network.onDisconnect().subscribe(() => {
      console.log('Network disconnected!');
    });
  }

  // 检查当前网络连接状态
  checkNetworkStatus(): Observable<boolean> {
# NOTE: 重要实现细节
    if (this.platform.is('cordova')) {
      return this.network.type ? of(true) : of(false);
    } else {
      // 在非移动设备上，默认网络是连接的
      return of(true);
    }
  }

  // 检查是否在线
  isOnline(): Observable<boolean> {
    return this.checkNetworkStatus().pipe(
      switchMap((isConnected) => of(isConnected === 'wifi' || isConnected === 'cellular'))
    );
  }
}
