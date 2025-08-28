// 代码生成时间: 2025-08-28 11:08:01
// file_unzip_tool.js
// This file provides a simple file unzip tool using Ionic framework and JS.

// Import required modules
import { alertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Zip } from 'jszip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileUnzipService {

    constructor(private alertController: alertController, private http: HttpClient) {}

    // Function to download and unzip a file
    public unzipFile(url: string, destinationPath: string): Observable<any> {
        return this.http.get(url, { responseType: 'blob' })
            .pipe(
                tap(blob => this.unzipBlob(blob, destinationPath))
            );
    }

    // Function to unzip a blob
    private unzipBlob(blob: Blob, destinationPath: string): void {
        const zip = new Zip();
        zip.loadAsync(blob)
            .then(zip => {
                console.log('Unzipping files...');
                // Extract files to the specified destination path
                zip.forEach((relativePath, zipEntry) => {
                    zipEntry.async('blob').then(content => {
                        this.saveAs(content, zipEntry.name, destinationPath);
                    }).catch(error => {
                        this.handleError(error);
                    });
                }).then(() => {
                    this.alertController.create({
                        header: 'Unzip Complete',
                        message: 'Files have been unzipped successfully.',
                        buttons: ['OK']
                    }).present();
                }).catch(error => {
                    this.handleError(error);
                });
            });
    }

    // Function to save the blob as a file
    private saveAs(blob: Blob, fileName: string, destinationPath: string): void {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Function to handle errors
    private handleError(error: any): void {
        console.error('Error unzipping file:', error);
        this.alertController.create({
            header: 'Unzip Error',
            message: 'An error occurred during the unzip process.',
            buttons: ['OK']
        }).present();
    }
}
