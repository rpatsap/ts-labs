// 1. Спроектуйте базову структуру для різних типів контенту

// Базовий інтерфейс для всього контенту
interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: "draft" | "published" | "archived";
}

// Типи контенту
interface Article extends BaseContent {
  title: string;
  content: string;
  author: string;
  tags: string[];
}

interface Product extends BaseContent {
  name: string;
  price: number;
  description: string;
  stockQuantity: number;
}

// 2. Створіть generic тип для операцій з контентом
type ContentOperations<T extends BaseContent> = {
  create: (content: T) => T;
  read: (id: string) => T | undefined;
  update: (id: string, updatedContent: T) => T | undefined;
  delete: (id: string) => boolean;
};

// Реалізація операцій для Article
const articleOperations: ContentOperations<Article> = {
  create: (content: Article) => {
    // Реалізація створення статті
    console.log("Article created:", content);
    return content;
  },
  read: (id: string) => {
    // Реалізація отримання статті
    return {
      id,
      title: "Sample Article",
      content: "Content",
      author: "John Doe",
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "published",
    };
  },
  update: (id: string, updatedContent: Article) => {
    // Реалізація оновлення статті
    console.log("Article updated:", updatedContent);
    return updatedContent;
  },
  delete: (id: string) => {
    // Реалізація видалення статті
    console.log(`Article with ID: ${id} deleted`);
    return true;
  },
};

// 3. Створіть систему типів для управління правами доступу
type Role = "admin" | "editor" | "viewer";

type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// Система контролю доступу для контенту
type AccessControl<T extends BaseContent> = {
  [role in Role]: Permission;
};

// Створення доступу для різних ролей
const accessControl: AccessControl<Article> = {
  admin: { create: true, read: true, update: true, delete: true },
  editor: { create: true, read: true, update: true, delete: false },
  viewer: { create: false, read: true, update: false, delete: false },
};

// 4. Створіть систему валідації для контенту
type ValidationResult = {
  isValid: boolean;
  errors?: string[];
};

type Validator<T> = {
  validate: (data: T) => ValidationResult;
};

// Валідатор для статей
const articleValidator: Validator<Article> = {
  validate: (data: Article) => {
    const errors: string[] = [];

    if (!data.title) errors.push("Title is required");
    if (!data.content) errors.push("Content is required");
    if (!data.author) errors.push("Author is required");

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  },
};

// Композитний валідатор для продуктів
const productValidator: Validator<Product> = {
  validate: (data: Product) => {
    const errors: string[] = [];

    if (!data.name) errors.push("Name is required");
    if (data.price <= 0) errors.push("Price must be greater than 0");
    if (data.stockQuantity < 0)
      errors.push("Stock quantity cannot be negative");

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  },
};

// 5. Реалізуйте систему версіонування контенту
type Versioned<T extends BaseContent> = T & {
  version: number;
  changeLog: string[];
};

// Приклад статті з версіонуванням
const versionedArticle: Versioned<Article> = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
  status: "published",
  title: "Versioned Article",
  content: "This is a versioned article.",
  author: "John Doe",
  tags: ["tag1", "tag2"],
  version: 1,
  changeLog: ["Article created"],
};

// Тестування функцій
const newArticle: Article = {
  id: "2",
  createdAt: new Date(),
  updatedAt: new Date(),
  status: "draft",
  title: "My New Article",
  content: "This is my new article.",
  author: "Jane Doe",
  tags: ["tag1"],
};

// Валідація статті
const validationResult = articleValidator.validate(newArticle);
if (validationResult.isValid) {
  // Якщо стаття валідна, створюємо її
  articleOperations.create(newArticle);
} else {
  console.log("Article validation failed:", validationResult.errors);
}

// Доступ для ролей
const userRole: Role = "editor";
const hasPermission = accessControl[userRole].create;
if (hasPermission) {
  console.log("You can create content.");
} else {
  console.log("You don't have permission to create content.");
}
