// const endpoints 
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";

const ORDERS_QUERY_KEYS = {
    GET_ALL_ORDERS : "GET_ALL_ORDERS",
}

export class OrderServices {
    public static async getOrders() {
        const res = await axios.get('https://slug-server.onrender.com/api/app/orders');
        return await res.data.data;
    }

    public static async getOrderById(id : string) {
        const res = await axios.get('https://slug-server.onrender.com/api/app/orders/' + id);
        return await res.data.data;
    }

    public static async updateOrderStatusById(id : string, newStatus : string) {
        const res = await axios.put(`https://slug-server.onrender.com/api/app/orders/status/${id}`, {newStatus});
        return await res.data;
    }

}

export const useGetOrders = () => useQuery(ORDERS_QUERY_KEYS.GET_ALL_ORDERS, OrderServices.getOrders);

export const useGetOrderById = (id: string) => useQuery([ORDERS_QUERY_KEYS.GET_ALL_ORDERS, id], () => OrderServices.getOrderById(id))

export const useUpdateOrderById = () => {
    const queryClient = useQueryClient();

    return useMutation((payload : {id : string, newStatus : string})=> OrderServices.updateOrderStatusById(payload.id, payload.newStatus),{
        onSuccess : () => {
            queryClient.invalidateQueries([ORDERS_QUERY_KEYS.GET_ALL_ORDERS])
        }
    })
}

