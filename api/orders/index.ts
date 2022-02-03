import axios from "../axios";
import { ICreateOrder, IOrder } from '../../types/Order.type'

class OrdersDataService {
    async getOneOrder(id: string, token: string): Promise<IOrder> {
        const response = await axios.get<IOrder>(`/orders/${id}`, {
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
        return response.data
    }
    async getOrdersHistory(token: string | undefined): Promise<IOrder[]> {
        const response = await axios.get<IOrder[]>("/orders", {
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
    async createOrder(data: ICreateOrder, token: string): Promise<IOrder> {
        const response = await axios.post<IOrder>("/orders", data, {
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
    async diliveredOrder(id: string, token: string | undefined): Promise<IOrder> {
        const response = await axios.get<IOrder>(`/orders/delivered/${id}`, {
            headers: {
                "Content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
}

export default new OrdersDataService();