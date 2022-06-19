export interface Order{
    id?:number;
    productCode?:string;
    productName?:string;
    batchCode?:string;
    batchSize?:number;
    numberOfBatches?:number;
    productPrice?:string;
}
export interface OrderDto{
    productId?:number;
    numberOfBatches?:number;
    isBatchMaxSize?:boolean;
}