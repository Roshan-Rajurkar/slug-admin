import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export class ProductService {
  public static async getAllProducts() {
    const res = await axios.get(
      "https://slug-server.onrender.com/api/app/get_all_products",
      {
        params: {
          orderBy: "desc",
        },
      },
    );
    return res.data.data;
  }

  public static async getProductById(productId: string) {
    const res = await axios.get(
      `https://slug-server.onrender.com/api/app/get_product/${productId}`,
    );
    return res.data.data;
  }

  public static async addProduct(product: FormData) {
    const res = await axios.post(
      "https://slug-server.onrender.com/api/app/add_product",
      product,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  }

  public static async updateProduct(productId: string, product: FormData) {
    const res = await axios.put(
      `https://slug-server.onrender.com/api/app/edit_product/${productId}`,
      product,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  }

  public static async deleteProduct(productId: string) {
    const res = await axios.delete(
      `https://slug-server.onrender.com/api/app/delete_product/${productId}`,
    );
    return res.data;
  }
}

const PRODUCT_QUERY_KEYS = {
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_ALL_PRODUCTS_BY_ID: "GET_ALL_PRODUCTS_BY_ID",
};

export const useGetAllProducts = () =>
  useQuery(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS, ProductService.getAllProducts);

export const useGetProductById = (productId: string) =>
  useQuery(
    [PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS_BY_ID, productId],
    () => ProductService.getProductById(productId),
    {
      enabled: !!productId,
    },
  );

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (product: FormData) => ProductService.addProduct(product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS);
      },
    },
  );
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { productId: string; product: FormData }) =>
      ProductService.updateProduct(payload.productId, payload.product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS);
      },
    },
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (productId: string) => ProductService.deleteProduct(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS);
      },
    },
  );
};
