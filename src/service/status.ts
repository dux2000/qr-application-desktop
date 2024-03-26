import {api_endpoint} from "../boot/axios";
import {StatusDto} from "../interface/Interfaces";

const status = {
    async getStatusTransitions(statusCode: string) : Promise<StatusDto[]> {
        const url = `status/${statusCode}`

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default status;