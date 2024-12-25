import { Product, productData } from './productData';

export interface Promotion {
  id: number;
  image: string;
}

export interface MenuCategory {
  id: number;
  title: string;
  image: string;
}

export const promotions: Promotion[] = [
  {
    id: 1,
    image: "https://www.kfcpakistan.com/images/7e703860-8c0a-11ef-96ca-83eb584d9244-WebBanner1675x600_desktop_image-2024-10-16220337.jpg"
  },
  {
    id: 2,
    image: "https://www.kfcpakistan.com/images/65d4ad90-8cb9-11ef-ac1f-b1915cbd0455-Web-banner-1675x600_desktop_image-2024-10-17185537.jpg"
  },
  {
    id: 3,
    image: "https://www.kfcpakistan.com/images/a9fd6850-8d58-11ef-8691-e5253fef787b-Web-banner-1675x600_desktop_image-2024-10-18135542.jpg"
  }
];

export const menuCategories: MenuCategory[] = [
  {
    id: 1,
    title: "Everyday Value",
    image: "https://www.kfcpakistan.com/images/12dd14f0-c523-11ee-a0b2-43ac3530dd54-KRUNCH-590X480-2024-02-06190812.png"
  },
  {
    id: 2,
    title: "Ala-Carte-&-Combos",
    image: "https://www.kfcpakistan.com/images/afc4e8b0-ff99-11ed-8640-872ee63b5da0-alacart-2023-05-31095826.png"
  },
  {
    id: 3,
    title: "Signature-Boxes",
    image: "https://www.kfcpakistan.com/images/afc536d0-ff99-11ed-a006-17c81341cbe8-Signaturebox-2023-05-31095826.png"
  },
  {
    id: 4,
    title: "Promotion",
    image: "https://www.kfcpakistan.com/images/a9b4fb90-8d82-11ef-ae4a-7712e9c1a6fb-Thumbnail590x4802copy-2024-10-18185620.png"
  },
  {
    id: 5,
    title: "Sharing",
    image: "https://www.kfcpakistan.com/images/afc4e8b0-ff99-11ed-8640-872ee63b5da0-Sharing-2023-05-31095826.png"
  }
];

export const bestSellers: number[] = [100,101, 200, 300];
export const topDeals: number[] = [400, 500, 100, 200];
export const recommendations: number[] = [100, 300, 600,602];

export const menuCategoryItems: { [key: string]: number[] } = {
  "Everyday Value": [100, 101],
  "Ala-Carte-&-Combos": [200,101],
  "Signature-Boxes": [300],
  "Promotion": [400,],
  "Sharing": [500],
  "Snacks-&-Beverages": [600, 700, 701, 702],
  "Midnight": [800]
};

// to get full product details by ID
export function getProductById(id: number): Product | undefined {
  return productData.find(product => product.id === id);
}

//to get full product details for an array of IDs
export function getProductsByIds(ids: number[]): Product[] {
  return ids.map(id => getProductById(id)).filter((product): product is Product => product !== undefined);
}

