import { ICartItem, IShipping } from './Cart.type'

export interface IOrder extends ICreateOrder {
    _id: string,
    user: string,
    isPaid: boolean,
    paidAt: Date,
    isDelivered: boolean,
    deliveredAt: Date,
    createdAt: Date
}

export interface ICreateOrder {
    orderItems: ICartItem[],
    shippingAddress: IShipping,
    paymentMethod: string,
    itemsPrice: number,
    shippingPrice: number,
    taxPrice: number,
    totalPrice: number,
}
