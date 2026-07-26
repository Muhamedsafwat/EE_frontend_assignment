import type { Product } from "./Product.interface";

export interface Step {
  id: string;
  icon: string;
  title: string;
  productCategory: Product["category"];
}

/** A step with the catalog products that belong to it resolved. */
export interface BuilderStep extends Step {
  products: Product[];
}
