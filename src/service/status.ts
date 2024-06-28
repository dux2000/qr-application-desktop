import {api_endpoint} from "../boot/axios";
import {StatusDto} from "../interface/Interfaces";
import tokenManager from "./token";

const status = {
    async getStatusTransitions(statusCode: string) : Promise<StatusDto[]> {
        const url = `status/${statusCode}`

        return api_endpoint.get(url, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default status;