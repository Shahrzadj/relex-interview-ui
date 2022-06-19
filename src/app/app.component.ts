import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from './domain/product';
import { ProductService } from './services/productservice';
import { OrderService } from './services/orderService';
import { Order } from './domain/order';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService,MessageService,ProductService,OrderService]
})
export class AppComponent implements OnInit {
    orderDialog: boolean;
    products: Product[];
    orders:Order[];
    product: Product;
    order:Order;
    selectedOrders:Order[];
    submitted: boolean;
    availableProducts:any[];
    batchSizeOptions: any[];
    constructor(private productService: ProductService,private orderService: OrderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.orderService.getOrders().subscribe(
            data => this.orders=data
        );
        this.productService.getProducts().subscribe(
            data=>this.availableProducts= data.map(d => {
                return {label: d.name, value: d.id};
            })
        )
        this.batchSizeOptions = [{label: 'Max', value: 'true'}, {label: 'Min', value: 'false'}];
    }

    openNew() {
        this.order={};
        this.product = {};
        this.submitted = false;
        this.orderDialog = true;
    }

    deleteSelectedOrders() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected orders?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
                this.selectedOrders = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }
    deleteOrder(order: Order) {
        console.log(order);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this order?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.orders = this.orders.filter(val => val.id !== order.id);
                this.order = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Order Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.orderDialog = false;
        this.submitted = false;
    }
  
}
