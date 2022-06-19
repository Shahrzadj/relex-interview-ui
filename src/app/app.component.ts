import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from './domain/product';
import { ProductService } from './services/productservice';
import { OrderService } from './services/orderService';
import { Order, OrderDto } from './domain/order';

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
    orderDto:OrderDto;
    product: Product;
    order:Order;
    selectedOrders:Order[];
    submitted: boolean;
    availableProducts:any[];
    batchSizeOptions: any[];
    numberOfBatches:number=1;
    selectedProduct:any;
    batchSize:boolean=true;
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
        this.batchSizeOptions = [{label: 'Max', value: true}, {label: 'Min', value: false}];
    }

    openNew() {
        this.order={};
        this.product = {};
        this.submitted = false;
        this.orderDialog = true;
    }

    deleteOrder(order: Order) {
        console.log(order);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this order?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.orderService.deleteOrder(order.id).subscribe(response=>{
                    this.orders = this.orders.filter( item => item.id !== response.id )
                });
                this.order = {};
                this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'Order Deleted Successfully!'});            }
        });
    }

    CreateOrder() {
        this.submitted = true;
        if(this.selectedProduct){
            this.orderDto.productId=this.selectedProduct;
            this.orderDto.numberOfBatches=this.numberOfBatches;
            this.orderDto.isBatchMaxSize=this.batchSize;
            this.orderService.createNewOrder(this.orderDto).subscribe(response => {
                this.orders = [ ...this.orders, { id: response.id,
                            productCode: response.product.code,
                            productName:response.product.name,
                            batchCode:response.batch.code,
                            batchSize:response.batchSize,
                            numberOfBatches:response.numberOfBatches,
                            productPrice:response.product.price } ]; 
            });
            
        }     
        this.messageService.add({key: 'bc', severity:'success', summary: 'Success', detail: 'Order Created Successfully!'}); 
        this.orderDialog = false;
        this.selectedProduct = {};
        this.numberOfBatches=0;
        this.batchSize=true;
    }

    hideDialog() {
        this.orderDialog = false;
        this.submitted = false;
    }
}
