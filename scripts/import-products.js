const axios = require("axios");

const products = require("../products.json");
const STRAPI_URL = "http://localhost:1337/api/products";
const TOKEN =
  "359169f1a4ded69d70e64b7888bbe8c9212a15dea35373417bbf35baa3205dfc487ff38e105d9c124d2c3bd2b5af10773a0d854f8d8d8475c421ab51b7d9c617c60675b71ae27681003e28d5f1bb1755bb5e1af0fa767ba224870ad8ea82f6a4a672cffe38763aa47ac91c9a64fd81f9428370abdbaed079d856d96bc62f788f";

async function createProducts() {
  try {
    for (const product of products) {
      await axios.post(
        STRAPI_URL,
        { data: product },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Added product: ${product.name}`);
    }
    console.log("All products added successfully!");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

createProducts();
