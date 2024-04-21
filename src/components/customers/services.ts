import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export class CustomersServices {
    static async getCustomers(searchQuery : string, limit : number | null, orderBy : string) {
        const res = await axios.get('https://slug-server.onrender.com/api/app/get_all_customers', {
            params: {
                query: searchQuery.trim(),
                limit: limit,
                orderBy: orderBy
            }
        });
        return res.data.data;
    }

    static async getCustomerActiveStats(){
        const res = await axios.get('https://slug-server.onrender.com/api/app/get_all_customers?limit="1000"');
        console.log(res.data.data)
        return res.data.data;
    }

    static async updateBlockStatus(customerId : string) {
        const res = await axios.put(`https://slug-server.onrender.com/api/app/check-block/${customerId}`);
        console.log(res)
        return res.data.data;
    }
}

const QUERY_CUSTOMERS = {
    GET_CUSTOMERS: 'GET_CUSTOMERS'
}

export const useGetCustomers = (payload: { searchQuery: string, limit: number | null, orderBy: string }) => 
    useQuery([QUERY_CUSTOMERS.GET_CUSTOMERS, payload.searchQuery, payload.limit, payload.orderBy], () => 
        CustomersServices.getCustomers(payload.searchQuery, payload.limit, payload.orderBy)
    );

export const useGetCustomersActiveStats = () => useQuery([QUERY_CUSTOMERS.GET_CUSTOMERS], CustomersServices.getCustomerActiveStats);

export const useUpdateBlockCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation((customerId : string)=> CustomersServices.updateBlockStatus(customerId),{
        onSuccess : () => {
            queryClient.invalidateQueries([QUERY_CUSTOMERS.GET_CUSTOMERS]);
        }
    })
}
