export type Product = {
    id: string; 
    name: string; 
    description: string; 
    price: string; 
    imageUrl: string;
    published : boolean 
  };

  export type ProductForm = {
    name : string,
    description : string,
    price : string,
    published : boolean
  }