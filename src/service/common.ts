import {CommonDataDto} from "../interface/Interfaces";
import {api_endpoint} from "../boot/axios";

const common = {
    async getCommonData(): Promise<CommonDataDto> {
        return api_endpoint.get('common')
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default common;