export interface MenuOption {
  volume: string;
  price: number;
}

export interface MenuItemWithSizes {
  id: string;
  name: string;
  russianName: string;
  description?: string;
  options: MenuOption[];
  featured?: boolean;
}

export interface MenuCategoryWithSizes {
  id: string;
  name: string;
  russianName: string;
  items: MenuItemWithSizes[];
}

export const MENU_DATA: MenuCategoryWithSizes[] = [
  {
    id: "with-milk",
    name: "With Milk",
    russianName: "С молоком",
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        russianName: "Капучино",
        options: [
          { volume: "200 ml", price: 140 },
          { volume: "300 ml", price: 190 },
          { volume: "400 ml", price: 220 }
        ],
        featured: true
      },
      {
        id: "latte",
        name: "Latte",
        russianName: "Латте",
        options: [
          { volume: "300 ml", price: 180 },
          { volume: "400 ml", price: 220 }
        ]
      },
      {
        id: "cheese-latte",
        name: "Cheese Latte",
        russianName: "Сырный Латте",
        options: [
          { volume: "300 ml", price: 260 },
          { volume: "400 ml", price: 300 }
        ],
        featured: true
      },
      {
        id: "spiced-cherry-latte",
        name: "Spiced Cherry Latte",
        russianName: "Пряная Вишня Латте",
        options: [
          { volume: "300 ml", price: 250 }
        ]
      },
      {
        id: "mint-latte",
        name: "Mint Latte",
        russianName: "Мятный Латте",
        options: [
          { volume: "300 ml", price: 200 },
          { volume: "400 ml", price: 240 }
        ]
      },
      {
        id: "flat-white",
        name: "Flat White",
        russianName: "Флэт Уайт",
        options: [
          { volume: "200 ml", price: 180 }
        ]
      },
      {
        id: "signature-cappuccino",
        name: "Signature Cappuccino / Latte",
        russianName: "Фирменный Капучино / Латте",
        options: [
          { volume: "200 ml", price: 180 },
          { volume: "300 ml", price: 210 },
          { volume: "400 ml", price: 250 }
        ],
        featured: true
      },
      {
        id: "raf",
        name: "Raf Coffee",
        russianName: "Раф",
        options: [
          { volume: "200 ml", price: 180 },
          { volume: "300 ml", price: 230 },
          { volume: "400 ml", price: 260 }
        ]
      },
      {
        id: "honey-latte",
        name: "Honey Latte",
        russianName: "Медовый Латте",
        options: [
          { volume: "300 ml", price: 200 },
          { volume: "400 ml", price: 240 }
        ]
      },
      {
        id: "peanut-raf",
        name: "Peanut Raf",
        russianName: "Арахисовый Раф",
        options: [
          { volume: "300 ml", price: 260 }
        ],
        featured: true
      },
      {
        id: "adult-cocoa",
        name: "Adult Cocoa",
        russianName: "Какао Взрослый",
        options: [
          { volume: "200 ml", price: 180 },
          { volume: "300 ml", price: 230 },
          { volume: "400 ml", price: 260 }
        ]
      }
    ]
  },
  {
    id: "without-milk",
    name: "Without Milk",
    russianName: "Без молока",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        russianName: "Эспрессо",
        options: [
          { volume: "60 ml", price: 120 }
        ]
      },
      {
        id: "americano",
        name: "Americano",
        russianName: "Американо",
        options: [
          { volume: "150 ml", price: 100 },
          { volume: "300 ml", price: 140 }
        ]
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        russianName: "Фильтр-кофе",
        options: [
          { volume: "150 ml", price: 120 },
          { volume: "300 ml", price: 170 }
        ],
        featured: true
      },
      {
        id: "v60-pour-over",
        name: "V60 Pour Over",
        russianName: "V60 Пуровер",
        options: [
          { volume: "300 ml", price: 190 }
        ]
      },
      {
        id: "hot-bumble",
        name: "Hot Bumble",
        russianName: "Горячий Бамбл",
        options: [
          { volume: "300 ml", price: 200 }
        ]
      }
    ]
  },
  {
    id: "non-coffee",
    name: "Non-Coffee",
    russianName: "Без кофе",
    items: [
      {
        id: "matcha-latte",
        name: "Matcha Latte",
        russianName: "Матча Латте",
        options: [
          { volume: "300 ml", price: 180 },
          { volume: "400 ml", price: 220 }
        ]
      },
      {
        id: "premium-matcha-latte",
        name: "Premium Matcha Latte",
        russianName: "Премиум Матча Латте",
        options: [
          { volume: "300 ml", price: 220 },
          { volume: "400 ml", price: 260 }
        ],
        featured: true
      },
      {
        id: "sea-buckthorn-tea",
        name: "Sea Buckthorn Tea with Ginger",
        russianName: "Облепиховый чай с имбирем",
        options: [
          { volume: "300 ml", price: 180 }
        ],
        featured: true
      },
      {
        id: "cherry-mulled",
        name: "Cherry Mulled Drink with Currant",
        russianName: "Вишневый глинтвейн со смородиной",
        options: [
          { volume: "300 ml", price: 180 }
        ]
      },
      {
        id: "cocoa",
        name: "Cocoa",
        russianName: "Какао",
        options: [
          { volume: "200 ml", price: 150 },
          { volume: "300 ml", price: 170 },
          { volume: "400 ml", price: 190 }
        ]
      },
      {
        id: "hot-chocolate",
        name: "Hot Chocolate",
        russianName: "Горячий шоколад",
        options: [
          { volume: "200 ml", price: 170 },
          { volume: "300 ml", price: 190 },
          { volume: "400 ml", price: 210 }
        ]
      },
      {
        id: "tea-assorted",
        name: "Tea (assorted)",
        russianName: "Чай в ассортименте",
        options: [
          { volume: "300 ml", price: 100 },
          { volume: "400 ml", price: 120 }
        ]
      }
    ]
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Анна С. (Anna S.)",
    rating: 5,
    text: "Amazing atmosphere and incredible coffee. One of the best cafés in Krasnodar.",
    russianText: "Потрясающая атмосфера и невероятный кофе. Одна из лучших кофейных точек в Краснодаре.",
    date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Дмитрий К. (Dmitry K.)",
    rating: 5,
    text: "Perfect place to work with a laptop. Great Wi-Fi and very cozy interior.",
    russianText: "Идеальное место для работы с ноутбуком. Отличный Wi-Fi и очень уютный интерьер.",
    date: "May 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Елена В. (Elena V.)",
    rating: 5,
    text: "Friendly baristas, delicious desserts, and surprisingly affordable prices.",
    russianText: "Приветливые бариста, вкусные десерты и на удивление доступные цены.",
    date: "June 2026",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  russianTitle: string;
  category: "interior" | "coffee" | "dessert" | "barista" | "atmosphere";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: "/src/assets/images/letun_interior_1782236603378.jpg",
    title: "Cozy Modern Interior",
    russianTitle: "Уютный современный интерьер",
    category: "interior"
  },
  {
    id: 2,
    url: "/src/assets/images/letun_foam_art_1782236619924.jpg",
    title: "Perfect Latte Foam Art",
    russianTitle: "Идеальный латте-арт",
    category: "coffee"
  },
  {
    id: 3,
    url: "/src/assets/images/letun_dessert_1782236634848.jpg",
    title: "Premium Gourmet Dessert",
    russianTitle: "Премиальные изысканные десерты",
    category: "dessert"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    title: "Dedicated Baristas at Work",
    russianTitle: "Профессиональные бариста за работой",
    category: "barista"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800",
    title: "Warm Evening Lights",
    russianTitle: "Теплый вечерний свет кофейни",
    category: "atmosphere"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    title: "Selected Coffee Beans",
    russianTitle: "Отборные кофейные зерна",
    category: "coffee"
  }
];
