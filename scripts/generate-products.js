const { faker } = require('@faker-js/faker');
const fs = require('fs');

const products = Array.from({ length: 1000 }, (_, index) => ({
  name: `${faker.commerce.productName()} ${index + 1}`,
  price: faker.number.int({ min: 50, max: 1000 }),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  rating: faker.number.int({ min: 1, max: 5 }),
  reviewCount: faker.number.int({ min: 0, max: 500 }),
  images: [
    `https://example.com/images/product${index + 1}-1.jpg`,
    `https://example.com/images/product${index + 1}-2.jpg`
  ],
  image: `https://example.com/images/product${index + 1}-main.jpg`,
  imageList: [
    `https://example.com/images/product${index + 1}-3.jpg`,
    `https://example.com/images/product${index + 1}-4.jpg`
  ]
}));

fs.writeFileSync('../products.json', JSON.stringify(products, null, 2));
console.log('Generated products.json with 1000 items');
