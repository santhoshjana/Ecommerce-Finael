// models/cart-item.model.ts
export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    images: { image: string }[];
  };
  qty: number;
}
