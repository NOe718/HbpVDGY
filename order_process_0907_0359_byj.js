// 代码生成时间: 2025-09-07 03:59:29
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define an Order model
interface Order {
  id: number;
  product: string;
  quantity: number;
  price: number;
}

// Injectable service for handling orders
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://api.example.com/orders'; // URL to web API

  constructor(private http: HttpClient) { }

  // Method to create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to retrieve all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to update an existing order
  updateOrder(id: number, order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Order>(url, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to delete an order
  deleteOrder(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Private method to handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

/*
 * Ionic/Angular Component using the OrderService to handle orders
 */
import { Component, OnInit } from '@angular/core';
import { OrderService } from './order_service'; // Adjust path to your service
import { Order } from './order'; // Assuming Order interface is in the same directory
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss'],
})
export class OrderProcessComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService,
              private navCtrl: NavController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getOrders();
  }

  // Method to fetch all orders
  getOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        this.showToast(error.message);
      }
    });
  }

  // Method to create a new order
  createOrder(): void {
    const newOrder: Order = {
      id: Date.now(), // Simple ID generation
      product: 'New Product',
      quantity: 1,
      price: 100.0
    };

    this.orderService.createOrder(newOrder).subscribe({
      next: (createdOrder) => {
        this.orders.push(createdOrder);
        this.showToast('Order created successfully.');
      },
      error: (error) => {
        this.showToast(error.message);
      }
    });
  }

  // Method to delete an order
  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order.id).subscribe({
      next: () => {
        const index = this.orders.indexOf(order);
        this.orders.splice(index, 1);
        this.showToast('Order deleted successfully.');
      },
      error: (error) => {
        this.showToast(error.message);
      }
    });
  }

  // Helper method to show toast messages
  private showToast(message: string): void {
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).then(toast => toast.present());
  }
}
