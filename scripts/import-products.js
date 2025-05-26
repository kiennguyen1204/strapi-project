const axios = require("axios");

const products = require("../products.json");
const STRAPI_URL = "http://localhost:1337/api/products";
const TOKEN =
  "c37c1253b3e24ca1fdbc552cefc3ec78e6f67f1a2b541dc4de31f556632d3525437fff756c2500983aef1f62b978cdd7f0dafb3a3fe2d292b9cab768a8d72386043567372d1ba627a1fa30e05d5edf18240676b286f90824765d4229389ae474c50f89bdf87c2708606fe031f5a57724fc5053c787af3d147e6b79360ff36344";

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
