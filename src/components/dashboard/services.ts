import { useQuery } from "react-query"

class DashBoardServices {
    public static getDashBoardStats()  {
        // we are getting all sales, orders and purchases
        return {}
    }

    public static getDashboardOrdersAndSales(){
        // returning two arrays each months sales and orders
        return {}
    }

    public static getRecentOrders() {
        // return top 6 recent orders
        return {}
    }
}

const DashboardKeys = {
    GET_DASHBOARD_STATS : 'GET_DASHBOARD_STATS',
    GET_DASHBOARD_ORDERS_AND_SALES : 'GET_DASHBOARD_ORDERS_AND_SALES',
    GET_RECENT_ORDERS : 'GET_RECENT_ORDERS'
}

export const useGetDashBoardStats = () => useQuery(DashboardKeys.GET_DASHBOARD_STATS, DashBoardServices.getDashBoardStats())

export const useGetDashboardOrdersAndSales = () => useQuery(DashboardKeys.GET_DASHBOARD_ORDERS_AND_SALES, DashBoardServices.getDashboardOrdersAndSales())

export const useGetRecentOrders = () => useQuery(DashboardKeys.GET_RECENT_ORDERS, DashBoardServices.getRecentOrders())