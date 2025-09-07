// 代码生成时间: 2025-09-07 17:11:21
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// ConfigurationManager is an Injectable service that manages application settings
@Injectable({
  providedIn: 'root'
})
export class ConfigurationManager {
  private settings$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private settings: any;

  constructor(private storage: Storage) {
    this.loadSettings();
  }

  // Loads the settings from storage or initializes them if they do not exist
  loadSettings() {
    this.storage.get('settings').then(settings => {
      if (!settings) {
        this.settings = {};
        this.saveSettings();
      } else {
        this.settings = settings;
        this.settings$.next(this.settings);
      }
    }).catch(error => {
      console.error('Error loading settings:', error);
    });
  }

  // Saves the settings to storage
  saveSettings() {
    this.storage.set('settings', this.settings).then(() => {
      this.settings$.next(this.settings);
    }).catch(error => {
      console.error('Error saving settings:', error);
    });
  }

  // Gets a setting value by key
  getSetting(key: string): Observable<any> {
    return this.settings$.pipe(
      map(settings => settings[key]),
      catchError(error => {
        console.error('Error getting setting:', error);
        return ['default', error]; // Return a default value and log the error
      })
    );
  }

  // Sets a setting value by key
  setSetting(key: string, value: any): void {
    if (this.settings) {
      this.settings[key] = value;
      this.saveSettings();
    } else {
      console.error('Settings are not loaded yet.');
    }
  }

  // Resets all settings to default
  resetSettings() {
    this.settings = {};
    this.saveSettings();
  }
}

// Example usage:
// const configManager = new ConfigurationManager(storage);
// configManager.getSetting('someKey').subscribe(value => {
//   console.log('Setting value:', value);
// });
// configManager.setSetting('someKey', 'someValue');