import {ProductCommand, ProductDto, ProductTypeDto, SearchRequest, SearchResponse} from "../interface/Interfaces";
import {api_endpoint} from "../boot/axios";
import tokenManager from "./token";

const products = {
    async getProductById(id: string): Promise<ProductDto> {
        const url = `products/${id}`

        return api_endpoint.get(url, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getProducts(request: SearchRequest): Promise<SearchResponse<ProductDto>> {
        const url = 'products/filter'

        return api_endpoint.post(url, request, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getProductRevision(id: string): Promise<ProductDto[]> {
        const url = `products/revision/${id}`

        return api_endpoint.get(url, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async createProduct(userId: number, product: ProductCommand): Promise<ProductDto> {
        const url = `products/${userId}`

        return api_endpoint.post(url, product, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async deleteProduct(id: string): Promise<void> {
        const url = `products/${id}`

        return api_endpoint.delete(url, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default products;