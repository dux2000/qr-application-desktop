import {api_endpoint} from "../boot/axios";
import {ClothesDto} from "../interface/Interfaces";

const clothes = {
    async getClothesById(id: number) : Promise<ClothesDto> {
        const url = `clothes/${id}`

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async changeStatus(id: number, nextStatus: string) : Promise<ClothesDto> {
        const url = `clothes/${id}/${nextStatus}`

        return api_endpoint.put(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default clothes;