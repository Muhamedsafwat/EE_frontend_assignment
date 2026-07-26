export interface Product {
  id: string;
  name: string;
  description: string;
  comparedAtPrice?: number;
  price: number;
  image?: string;
  variants?: Variant[];
  category: "cameras" | "sensors" | "plans" | "accessories";
  isRequired?: boolean;
}

export interface Variant {
  id: string;
  name: string;
  image: string;
}
