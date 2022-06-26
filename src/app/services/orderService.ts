import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order,OrderDto } from '../domain/order';
@Injectable()
export class OrderService {
    public orderList: Order[];
    constructor(private http: HttpClient) { }

    getOrders() {
        return this.http.get<Order[]>(`${environment.apiUrl}/api/Orders`);
    }
    createNewOrder(dto: OrderDto): Observable<any> {
        return this.http.post<OrderDto>(`${environment.apiUrl}/api/Orders`, dto);
    }
    deleteOrder(id: number){
        return this.http.delete<Order>(`${environment.apiUrl}/api/Orders/`+ id);
    }
}