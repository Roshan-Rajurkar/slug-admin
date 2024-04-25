import { Product } from "../products/modals";

export type OrderDetails = {
    id: string;
    orderName: string;
    totalPrice: number;
    currency: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber?: string;
    };
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    items: Product[];
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    orderDate: Date;
    estimatedDeliveryDate?: Date;
  };
  