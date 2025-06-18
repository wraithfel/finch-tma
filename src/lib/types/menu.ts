export interface MenuItem {
  id: string;
  name: string;
  ingredients: string[];
  method: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  chip: string;
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
