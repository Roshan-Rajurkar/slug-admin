import { useQuery } from "react-query"
import { OrderServices } from "../orders/services"
import { Order } from "../orders/modal";

class DashBoardServices {
    public static async getDashBoardStats()  {
        // we are getting all sales, orders and purchases
        const orders = await OrderServices.getOrders();
        let totalPurchases = 0;
        let totalSales = 0;
        for (const order of orders) {
           
            if(order.status === "delivered"){ totalSales += parseInt(order.price); totalPurchases += 1;}
        }

        // Return dashboard stats
        return {
            totalOrders: orders.length,
            totalPurchases,
            totalSales
        };
    }

    public static async getDashboardOrdersAndSales(){

        const orders = await OrderServices.getOrders();
        // const sales = orders.map((order : Order) => order.status === "delivered")
        
        return {
            
        }
    }

    public static getRecentOrders() {
        // return top 6 recent orders
        return {}
    }
}

const DASHBOARD_QUERY_KEYS = {
    GET_DASHBOARD_STATS : 'GET_DASHBOARD_STATS',
    GET_DASHBOARD_ORDERS_AND_SALES : 'GET_DASHBOARD_ORDERS_AND_SALES',
    GET_RECENT_ORDERS : 'GET_RECENT_ORDERS'
}

export const useGetDashBoardStats = () => useQuery(DASHBOARD_QUERY_KEYS.GET_DASHBOARD_STATS, DashBoardServices.getDashBoardStats)

export const useGetDashboardOrdersAndSales = () => useQuery(DASHBOARD_QUERY_KEYS.GET_DASHBOARD_ORDERS_AND_SALES, DashBoardServices.getDashboardOrdersAndSales)

export const useGetRecentOrders = () => useQuery(DASHBOARD_QUERY_KEYS.GET_RECENT_ORDERS, DashBoardServices.getRecentOrders)