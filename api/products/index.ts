import { addProductData, IProduct, IProductFilter } from "../../types/Product.type";
import axios from "../axios";

class ProductsDataService {
    async getProducts(
        filter: IProductFilter,
        currentPage: number,
        countOnPage: number)
        : Promise<{ products: IProduct[], count: number }> {
        const response =
            await axios.get<{ products: IProduct[], count: number }>
                (`/products?type=${filter.type}&category=${filter.category}&sort=${filter.sort}&currentPage=${currentPage}&count=6`);
        return response.data
    }
    async getProduct(id: string): Promise<IProduct> {
        const response = await axios.get<IProduct>(`/products/${id}`);
        return response.data;
    }
    async removeProduct(id: string) {
        await axios.get(`/products/delete/${id}`);
    }

    async addProduct(data: addProductData) {
        console.log(data)
        await axios.post(`/products/add`, data);
    }
}
export default new ProductsDataService();