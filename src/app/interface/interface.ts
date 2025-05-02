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
