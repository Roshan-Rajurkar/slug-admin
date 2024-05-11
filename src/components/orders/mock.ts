import {Order, OrderStatus} from './modal'

export const mockOrders: Order[] = [
  {
    id: "1",
    price: "100",
    customer: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
    shippingAddress: {
      street: "123 Street",
      city: "City",
      state: "State",
      postalCode: "12345",
      country: "Country",
    },
    items: [],
    status: OrderStatus.Pending,
    paymentInfo : {
      method : '',
      paymentId : '',
      paymentStatus : '',
    },
    orderDate: new Date().toISOString(),
    estimatedDeliveryDate: new Date(),
  },
];

