export interface FoodCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  foodCategory: FoodCategory;
  image: string;
}

export interface User {
  id: number;
  name: string;
  secondName: string;
  email: string;
  number: string;
}
export interface AuthResponse {
  jwt: string;
  message: string;
  role: string;
}
