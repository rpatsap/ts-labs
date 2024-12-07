// Крок 1: Створення типів товарів

// Базовий тип товару
type BaseProduct = {
  id: number;
  name: string;
  price: number;
};

// Специфічні типи товарів
type Electronics = BaseProduct & {
  category: "electronics";
  brand: string;
  warranty: string;
};

type Clothing = BaseProduct & {
  category: "clothing";
  size: string;
  color: string;
};

type Book = BaseProduct & {
  category: "book";
  author: string;
  genre: string;
};

// Крок 2: Створення функцій для пошуку товарів

// Пошук товару за id
const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  return products.find((product) => product.id === id);
};

// Фільтрація товарів за ціною
const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  return products.filter((product) => product.price <= maxPrice);
};

// Крок 3: Створення кошика

// Тип для елемента кошика
type CartItem<T> = {
  product: T;
  quantity: number;
};

// Додавання товару в кошик
const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  return cart;
};

// Підрахунок загальної вартості
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

// Крок 4: Використання функцій

// Тестові дані для різних типів товарів
const electronics: Electronics[] = [
  {
    id: 1,
    name: "Телефон",
    price: 10000,
    category: "electronics",
    brand: "Samsung",
    warranty: "2 years",
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 25000,
    category: "electronics",
    brand: "Dell",
    warranty: "1 year",
  },
];

const clothing: Clothing[] = [
  {
    id: 3,
    name: "Футболка",
    price: 500,
    category: "clothing",
    size: "M",
    color: "Black",
  },
  {
    id: 4,
    name: "Джинси",
    price: 1500,
    category: "clothing",
    size: "L",
    color: "Blue",
  },
];

const books: Book[] = [
  {
    id: 5,
    name: "JavaScript для початківців",
    price: 300,
    category: "book",
    author: "John Doe",
    genre: "Programming",
  },
  {
    id: 6,
    name: "Тайм-менеджмент",
    price: 250,
    category: "book",
    author: "Jane Smith",
    genre: "Self-help",
  },
];

// Тестування функцій

// Пошук товару
const phone = findProduct(electronics, 1);
console.log(phone); // Виведе телефон

// Додавання товару в кошик
let cart: CartItem<Electronics>[] = [];
cart = addToCart(cart, phone!, 2);
console.log(cart); // Виведе доданий телефон до кошика

// Підрахунок загальної вартості кошика
const total = calculateTotal(cart);
console.log(total); // Виведе загальну вартість товарів у кошику

// Фільтрація товарів за ціною
const affordableElectronics = filterByPrice(electronics, 15000);
console.log(affordableElectronics); // Виведе лише телефон, оскільки ціна ноутбука більша
