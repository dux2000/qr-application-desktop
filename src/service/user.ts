import {api_endpoint} from "../boot/axios";
import {SearchRequest, SearchResponse, UserDto, UserInterface, UserTypeCommand} from "../interface/Interfaces";
import tokenManager from "./token";

const user = {
    async getUser(id: string) : Promise<UserDto> {
      const url = `users/${id}`

      return api_endpoint.get(url, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async loginUser(username: string, password: string) : Promise<UserDto> {
        const url = "users/login"

        return api_endpoint.post(url, {
            username: username,
            password: password
        })
            .then((response) => {
                tokenManager.setToken(response.data.token);
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getUsers(request: SearchRequest) : Promise<SearchResponse<UserDto>> {
        const url = "users/filter"

        return api_endpoint.post(url, request, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data;
            })
            .catch((error) => {throw error;})
    },

    async createUser(username: string, fullName: string, password: string, types: UserTypeCommand[]): Promise<UserDto> {
        const url = "users"
        type RequestBody = {
            fullName: string,
            username: string,
            password: string,
            types: UserTypeCommand[]
        }

        const requestBody: RequestBody = {
            fullName: fullName,
            username: username,
            password: password,
            types: types
        }
        return api_endpoint.post(url, requestBody, tokenManager.getAuthHeaders())
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
            types?: UserTypeCommand[]
        }

        const requestBody: RequestBody = {
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            update: user.update,
            types: user.types
        }

        return api_endpoint.put(url, requestBody, tokenManager.getAuthHeaders())
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

        return api_endpoint.post(url, requestBody, tokenManager.getAuthHeaders())
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default user;