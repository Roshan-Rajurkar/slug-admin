import { Product } from "../products/modals";

export type Order = {
     id: string;
    price: string;
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
    status: OrderStatus;
    paymentInfo ?: Payment
    orderDate: string;
    estimatedDeliveryDate?: Date;
  };


export enum OrderStatus  {
  Pending = 'pending',
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled"
}

export type Payment = {
  method : string,
  paymentId : string,
  paymentStatus : string,
  phoneNumber? : string,
  // update based on payment details
}