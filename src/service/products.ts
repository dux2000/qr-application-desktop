import {ProductCommand, ProductDto, ProductTypeDto, SearchRequest, SearchResponse} from "../interface/Interfaces";
import {api_endpoint} from "../boot/axios";

const products = {
    async getProductById(id: string): Promise<ProductDto> {
        const url = `products/${id}`

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getProducts(request: SearchRequest): Promise<SearchResponse<ProductDto>> {
        const url = 'products/filter'

        return api_endpoint.post(url, request)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getProductRevision(id: string): Promise<ProductDto[]> {
        const url = `products/revision/${id}`

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async createProduct(userId: number, product: ProductCommand): Promise<ProductDto> {
        const url = `products/${userId}`

        return api_endpoint.post(url, product)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getTypes(): Promise<ProductTypeDto[]> {
        const url = 'products/types'

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async deleteProduct(id: string): Promise<void> {
        const url = `products/${id}`

        return api_endpoint.delete(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default products;