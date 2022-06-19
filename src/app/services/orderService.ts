import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Order } from '../domain/order';


@Injectable()
export class OrderService {
    public orderList: Order[];
    constructor(private http: HttpClient) { }

    getOrders() {
        console.log(environment.apiUrl)
        return this.http.get<Order[]>(`${environment.apiUrl}/api/Orders`);
    }
}