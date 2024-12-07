// index.js

// Приклад простого JavaScript коду
for (let i = 1; i <= 200; i++) {
  // i: number
  console.log("Це рядок номер " + i); // i: number, string
}

// Функція для привітання
function greet(name) {
  // name: string
  return "Привіт, " + name + "!"; // string
}

// Виклик функції greet
console.log(greet("Світ")); // string

// Додаткові функції для демонстрації
function add(a, b) {
  // a: number, b: number
  return a + b; // number
}

function subtract(a, b) {
  // a: number, b: number
  return a - b; // number
}

function multiply(a, b) {
  // a: number, b: number
  return a * b; // number
}

function divide(a, b) {
  // a: number, b: number
  if (b === 0) {
    // b: number
    return "Ділення на нуль!"; // string
  }
  return a / b; // number
}

// Виклики математичних функцій
console.log("Сума 5 і 3: " + add(5, 3)); // string
console.log("Різниця 5 і 3: " + subtract(5, 3)); // string
console.log("Добуток 5 і 3: " + multiply(5, 3)); // string
console.log("Частка 5 і 3: " + divide(5, 3)); // string

// Генерація додаткових рядків
for (let i = 201; i <= 400; i++) {
  // i: number
  console.log("Це додатковий рядок номер " + i); // i: number, string
}

// Додаткові привітання
const names = ["Аня", "Богдан", "Віра", "Григорій", "Діана"]; // names: string[]
names.forEach((name) => {
  // name: string
  console.log(greet(name)); // string
});

// Виведення квадратів чисел від 1 до 20
for (let i = 1; i <= 20; i++) {
  // i: number
  console.log("Квадрат числа " + i + " дорівнює " + i * i); // i: number, string
}

// Виведення факторіалів чисел від 1 до 10
function factorial(n) {
  // n: number
  if (n === 0 || n === 1) {
    // n: number
    return 1; // number
  }
  return n * factorial(n - 1); // number
}

for (let i = 1; i <= 10; i++) {
  // i: number
  console.log("Факторіал числа " + i + " дорівнює " + factorial(i)); // i: number, string
}

// Завершення програми
console.log("Програма завершена."); // string
