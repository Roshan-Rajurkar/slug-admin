export const ordersMock = [
    {
        "order_id": "ORD5678",
        "customer_id": "CUST123",
        "order_date": "2024-04-23T10:00:00Z",
        "status": "pending",
        "total_amount": "150.00",
        "shipping_address": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "postal_code": "12345",
          "country": "USA"
        },
        "items": [
          {
            "product_id": "PROD001",
            "product_name": "Laptop",
            "quantity": 1,
            "price": "100.00"
          },
          {
            "product_id": "PROD002",
            "product_name": "Mouse",
            "quantity": 2,
            "price": "25.00"
          },
          {
            "product_id": "PROD003",
            "product_name": "Keyboard",
            "quantity": 1,
            "price": "25.00"
          }
        ],
        "payment": {
          "method": "Credit Card",
          "card_type": "Visa",
          "card_last_four_digits": "1234",
          "payment_status": "completed"
        }
      }
  ,{
    "order_id": "ORD5272",
    "customer_id": "CUST223",
    "order_date": "2024-04-23T10:12:00Z",
    "status": "pending",
    "total_amount": "120.00",
    "shipping_address": {
      "street": "123 Ma Din St",
      "city": "AnyDown",
      "state": "CA",
      "postal_code": "12345",
      "country": "USA"
    },
    "items": [
      {
        "product_id": "PROD001",
        "product_name": "Laptop",
        "quantity": 1,
        "price": "100.00"
      },
      {
        "product_id": "PROD002",
        "product_name": "Mouse",
        "quantity": 2,
        "price": "25.00"
      },
      {
        "product_id": "PROD003",
        "product_name": "Keyboard",
        "quantity": 1,
        "price": "25.00"
      }
    ],
    "payment": {
      "method": "Credit Card",
      "card_type": "Visa",
      "card_last_four_digits": "1234",
      "payment_status": "completed"
    }
  }
      
]