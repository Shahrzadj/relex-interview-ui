import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from '../domain/product';


@Injectable()
export class ProductService {
    public ProductList: Product[];
    constructor(private http: HttpClient) { }

    getProducts() {
        console.log(environment.apiUrl)
        return this.http.get<Product[]>(`${environment.apiUrl}/api/Products`);
    }
}