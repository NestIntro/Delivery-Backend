export interface Order {
    id: string;
    user_id: string;
    status: OrderStatus;
}

export enum OrderStatus {
    WAITING = 'WAITING',
    COMPLETED = 'COMPLETED' 
}