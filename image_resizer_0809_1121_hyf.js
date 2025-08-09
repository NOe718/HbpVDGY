// 代码生成时间: 2025-08-09 11:21:37
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
# NOTE: 重要实现细节
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Service to handle image resizing functionalities
@Injectable({
  providedIn: 'root'
})
export class ImageResizerService {
  // URL for the API endpoint
  private apiUrl = `${environment.apiUrl}/images/resize`;

  constructor(private http: HttpClient) { }

  // Method to resize images in bulk
  resizeImages(images: File[], width: number, height: number): Observable<any> {
# 优化算法效率
    // Prepare the payload for resizing
    const formData = new FormData();
# FIXME: 处理边界情况
    images.forEach((image, index) => {
# NOTE: 重要实现细节
      formData.append(`images`, image);
# NOTE: 重要实现细节
    });
    formData.append('width', width.toString());
    formData.append('height', height.toString());

    // Send thePOST request to resize the images
    return this.http.post(this.apiUrl, formData, {
      reportProgress: true, // To track progress
      observe: 'events' // To emit events instead of the final response
    }).pipe(
      map(event => {
        if (event.type === 4) { // When the event is a download progress event
          console.log('Download Progress:', event.loaded, 'bytes');
        }
      }),
      catchError(error => {
        console.error('Error resizing images:', error);
        return throwError(error);
      })
    );
  }
}

/*
 * Usage example:
 * let images = [File object 1, File object 2, ...];
 * let width = 800;
 * let height = 600;
 * this.imageResizerService.resizeImages(images, width, height).subscribe({
 *   next: event => handleProgress(event),
 *   error: error => handleError(error)
# 优化算法效率
 * });
 */