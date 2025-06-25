export interface Sauce {
  id: string;
  name: string;
  ingredients: string[];
  allergens?: string[];
}
export interface MenuItem {
  id: string;
  name: string;
  ingredients: string[];
  method: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  chip: string;
  allergens?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  sauceIds?: string[];
  variants?: {
    id: string;
    name: string;
    description?: string;
    chip?: string;
  }[];
}

export interface Extra {
  id: string;
  name: string;
  description?: string;
}

export interface Category {
  key: string;
  name: string;
  items: MenuItem[];
  extras?: Extra[];
}

export interface Menu {
  categories: Category[];
}
