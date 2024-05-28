export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  file: string;
  published: boolean;
};

export type ProductForm = {
  name: string;
  description: string;
  price: number;
  published: boolean;
  file?: FileList;
};
