import {api_endpoint} from "../boot/axios";
import {CustomerDto, SearchRequest, SearchResponse} from "../interface/Interfaces";

const customer = {
    async getCustomers(request: SearchRequest) : Promise<SearchResponse<CustomerDto>> {
        const url = 'customers/filter'

        return api_endpoint.post(url, request)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getCustomerWithId(id: number): Promise<CustomerDto> {
        const url = `customers/${id}`

        try {
            const response = await api_endpoint.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async createCustomer(fullName: string, contactType1: string, contactInfo1: string, contactType2: string, contactInfo2: string): Promise<CustomerDto> {
        const url = "customers"

        const newCustomer = {
            fullName: fullName,
            contacts: [
                {
                    type: contactType1,
                    contactInfo: contactInfo1
                },
                {
                    type: contactType2,
                    contactInfo: contactInfo2
                },
            ]
        }

        return api_endpoint.post(url, newCustomer)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error
            })
    },

    async deleteCustomer(id: number): Promise<CustomerDto> {
      const url = `customers/${id}`

      return api_endpoint.delete(url)
          .then((response) => {
              return response.data
          })
          .catch((error)=> {
              throw error
          })
    },

    async updateCustomer(id: number, fullName?: string): Promise<CustomerDto> {
        const url = `customers/${id}`

        const updatedCustomer = {
            fullName: fullName,
        }

        return api_endpoint.put(url, updatedCustomer)
            .then((response) => {
                return response.data
            })
            .catch((error)=> {
                throw error
            })
    },
}

export default customer;