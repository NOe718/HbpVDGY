// 代码生成时间: 2025-08-31 01:28:54
// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCleaningService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch data from the server and preprocess it.
   * @returns An Observable of preprocessed data.
   */
  fetchDataAndPreprocess(): Observable<any> {
    return this.http.get('/api/data').pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP error
   * @param error - The error caught by the catchError operator.
   * @returns An Observable that throws the error.
   */
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status} with body: " ${error.error}"`;
    }
    return throwError(errorMessage);
  }

  /**
   * Remove duplicates from an array of objects.
   * @param data - The array of objects to remove duplicates from.
   * @returns The array with duplicates removed.
   */
  removeDuplicates(data: any[]): any[] {
    return data.filter((item, index, self) => {
      return index === self.findIndex((t) => t.id === item.id);
    });
  }

  /**
   * Fill missing values with a default value.
   * @param data - The data with missing values.
   * @param defaultValue - The default value to fill in.
   * @returns The data with missing values filled.
   */
  fillMissingValues(data: any[], defaultValue: any): any[] {
    return data.map(row => {
      for (const key in row) {
        if (row[key] === null || row[key] === undefined) {
          row[key] = defaultValue;
        }
      }
      return row;
    });
  }

  /**
   * Normalize data by scaling it to a specific range.
   * @param data - The data to normalize.
   * @param range - The target range (e.g., [0, 1]).
   * @returns The normalized data.
   */
  normalizeData(data: any[], range: [number, number]): any[] {
    const [min, max] = range;
    return data.map(value => (value - min) / (max - min));
  }
}
