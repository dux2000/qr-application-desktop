import { ProductDto, SearchRequest, SearchResponse} from "../interface/Interfaces";
import {api_endpoint} from "../boot/axios";

const products = {
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
        const url = `products/${id}`

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default products;