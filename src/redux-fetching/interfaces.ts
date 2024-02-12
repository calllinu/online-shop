export interface CategoryData {
    id: string;
    name: string;
    subcategories?: SubcategoryData[];
}

export interface SubcategoryData {
  name: string;
  id: string
}

export interface DiscountWatches {
  name: string;
  id: string;
  discount: number;
  series: string;
  photo: string;
}

export interface DataItem {
    id: string;
    image: string;
    name: string;
    value: string;
    currency: string;
}

export interface PhotoData {
  id: string;
  url: string;
}

export interface ResolvedCategoryData extends CategoryData {
  subcategories: CategoryData[];
}
  