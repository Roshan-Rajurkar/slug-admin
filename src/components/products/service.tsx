import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProductForm } from "./modals";
import axios from "axios";

export class ProductService {
  public static async getAllProducts() {
    const res = await axios.get(
      "https://slug-server.onrender.com/api/app/get_all_products",
    );
    return await res.data.data;
  }

  public static async getProductById(productId: string) {
    const res = await axios.get(
      `https://slug-server.onrender.com/api/app/get_product/${productId}`,
    );

    return await res.data.data;
  }

  public static async addProduct(product: ProductForm) {
    const res = await axios.post(
      "https://slug-server.onrender.com/api/app/add_product",
      product,
    );
    return res;
  }

  public static async updateProduct(productId: string, product: ProductForm) {
    const res = await axios.put(
      `https://slug-server.onrender.com/api/app/edit_product/${productId}`,
      product,
    );
    return res;
  }

  public static async deleteProduct(productId: string) {
    const res = await axios.delete(
      `https://slug-server.onrender.com/api/app/delete_product/${productId}`,
    );
    return res;
  }

  public static async exportProductData(): Promise<{
    data: any;
    filename: string;
    delimiter: string;
  }> {
    const productsData = await ProductService.getAllProducts();
    console.log(productsData);
    const dataToConvert = {
      data: productsData,
      filename: "availabel_products_report",
      delimiter: ",",
    };

    return dataToConvert;
  }
}

// query keys for caching
const PRODUCT_QUERY_KEYS = {
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  GET_ALL_PRODUCTS_BY_ID: "GET_ALL_PRODUCT_BY_ID",
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
    (product: ProductForm) => ProductService.addProduct(product),
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
    (payload: { productId: string; product: ProductForm }) =>
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

export const useExportProductsToCsv = () =>
  useQuery(
    PRODUCT_QUERY_KEYS.GET_ALL_PRODUCTS,
    ProductService.exportProductData,
  );
