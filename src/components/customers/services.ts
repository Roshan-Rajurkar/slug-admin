import axios from "axios";
import { useQuery } from "react-query";

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
}

const QUERY_CUSTOMERS = {
    GET_CUSTOMERS: 'GET_CUSTOMERS'
}

export const useGetCustomers = (payload: { searchQuery: string, limit: number | null, orderBy: string }) => 
    useQuery([QUERY_CUSTOMERS.GET_CUSTOMERS, payload.searchQuery, payload.limit, payload.orderBy], () => 
        CustomersServices.getCustomers(payload.searchQuery, payload.limit, payload.orderBy)
    );
