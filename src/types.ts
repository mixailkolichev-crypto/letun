export interface MenuItem {
  name: string;
  russianName?: string;
  volume: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  russianName: string;
  items: {
    [key: string]: MenuItem[];
  };
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}
