import {api_endpoint} from "../boot/axios";
import {SearchRequest, SearchResponse, UserDto, UserInterface} from "../interface/Interfaces";

const user = {
    async loginUser(username: string, password: string) : Promise<UserDto> {
        const url = "users/login"

        return api_endpoint.post(url, {
            username: username,
            password: password
        })
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getUsers(request: SearchRequest) : Promise<SearchResponse<UserDto>> {
        const url = "users/filter"

        return api_endpoint.post(url, request)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {throw error;})
    },

    async createUser(username: string, fullName: string, password: string, role: string): Promise<UserDto> {
        const url = "users"
        type RequestBody = {
            fullName: string,
            username: string,
            password: string,
            role: string
        }

        const requestBody: RequestBody = {
            fullName: fullName,
            username: username,
            password: password,
            role: role
        }
        return api_endpoint.post(url, requestBody)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error
            })
    },

    async updateUser(user: UserInterface): Promise<UserDto> {
        const url = `users/${user.id}`
        type RequestBody = {
            fullName: string,
            username: string,
            password?: string,
            update: boolean,
        }

        const requestBody: RequestBody = {
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            update: user.update,
        }

        return api_endpoint.put(url, requestBody)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            })
    },

    async changePassword(id: number, oldPassword: string, newPassword: string): Promise<UserDto> {
        const url = `users/${id}/change-password`
        type RequestBody = {
            oldPassword: string,
            newPassword: string
        }

        const requestBody: RequestBody = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        return api_endpoint.post(url, requestBody)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default user;