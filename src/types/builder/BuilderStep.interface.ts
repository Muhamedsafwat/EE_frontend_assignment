import { Product } from "../data/Product.interface";
import { Step } from "../data/Step.interface";

export interface BuilderStep extends Step {
  products: Product[];
}
