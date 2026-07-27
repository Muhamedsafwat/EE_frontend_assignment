import type { Product } from "./Product.interface";

export interface Step {
  id: string;
  icon: string;
  title: string;
  productCategory: Product["category"];
}

export interface BuilderStep extends Step {
  products: Product[];
}
