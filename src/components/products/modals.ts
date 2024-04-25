export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  published: boolean;
};

export type ProductForm = {
  name: string;
  description: string;
  price: number;
  published: boolean;
  imageUrl?: string;
};
