import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProductForm } from "./modals";
import axios from "axios";

class ProductService {
  public static async getAllProducts() {
    console.log(process.env.LOCAL_HOST_ENDPOINT);
    const res = await axios.get(
      "http://localhost:5000/api/app/get_all_products",
    );

    return await res.data.data;
  }

  public static async addProduct(data: ProductForm) {
    const res = await axios.post(
      "http://localhost:5000/api/app/add_product",
      data,
    );
    return res;
  }

  public static async updateProduct(productId: string, data: ProductForm) {
    const res = await axios.put(
      "http://localhost:5000/api/app/edit_product/" + productId,
      data,
    );
    return res;
  }

  public static async deleteProduct(productId: string) {
    const res = await axios.delete(
      "http://localhost:5000/api/app/get_all_products/" + productId,
    );
    return res;
  }
}

// query keys for caching
const PRODUCT_QUERY_KEYS = {
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
};

export const useGetAllProducts = () =>
  useQuery(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS, ProductService.getAllProducts);

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data: ProductForm) => ProductService.addProduct(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { productId: string; data: ProductForm }) =>
      ProductService.updateProduct(payload.productId, payload.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS);
      },
    },
  );
};
