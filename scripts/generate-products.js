const { faker } = require("@faker-js/faker");
const fs = require("fs");

const products = Array.from({ length: 1000 }, (_, index) => ({
  name: `${faker.commerce.productName()} ${index + 1}`,
  price: faker.number.int({ min: 50, max: 1000 }),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  rating: faker.number.int({ min: 1, max: 5 }),
  reviewCount: faker.number.int({ min: 0, max: 500 }),
  images: [],
  image: `https://m.media-amazon.com/images/I/61j3e6uWiuL._AC_SL1500_.jpg`,
  imageList: [
    {
      color: "#FFFFFF",
      image: "https://m.media-amazon.com/images/I/61j3e6uWiuL._AC_SL1500_.jpg",
    },
    {
      color: "#B4916C",
      image: "https://m.media-amazon.com/images/I/61lJK9kXTqL._AC_SL1500_.jpg",
    },
    {
      color: "#E4CBAD",
      image: "https://m.media-amazon.com/images/I/71a2eOmVxLL._AC_SL1500_.jpg",
    },
  ],
}));

fs.writeFileSync("../products.json", JSON.stringify(products, null, 2));
console.log("Generated products.json with 1000 items");
