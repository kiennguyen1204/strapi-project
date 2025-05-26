const axios = require("axios");
const products = require("../products.json");
const STRAPI_URL = "https://strapi-project-g2z5.onrender.com/api/products";
const TOKEN =
  "c37c1253b3e24ca1fdbc552cefc3ec78e6f67f1a2b541dc4de31f556632d3525437fff756c2500983aef1f62b978cdd7f0dafb3a3fe2d292b9cab768a8d72386043567372d1ba627a1fa30e05d5edf18240676b286f90824765d4229389ae474c50f89bdf87c2708606fe031f5a57724fc5053c787af3d147e6b79360ff36344";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function deleteAllProducts() {
  try {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(STRAPI_URL, {
        headers,
        params: { "pagination[page]": page, "pagination[pageSize]": 100 },
      });

      if (!response.data || !response.data.data) {
        console.log("No products found or invalid API response.");
        hasMore = false;
        continue;
      }

      const products = response.data.data;
      const pagination = response.data.meta?.pagination;

      if (products.length === 0) {
        console.log("No more products to delete.");
        hasMore = false;
        continue;
      }

      for (const product of products) {
        if (product.id) {
          await axios.delete(`${STRAPI_URL}/${product.id}`, { headers });
          const productName = product.attributes?.name || `ID ${product.id}`;
          console.log(`Deleted product: ${productName}`);
        } else {
          console.log("Skipping product with no ID:", product);
        }
      }

      if (!pagination || page >= pagination.pageCount) {
        hasMore = false;
      } else {
        page++;
      }
    }
    console.log("All products deleted successfully!");
  } catch (error) {
    console.error(
      "Error deleting products:",
      error.response?.data || error.message
    );
  }
}

async function createProducts() {
  try {
    for (const product of products) {
      await axios.post(STRAPI_URL, { data: product }, { headers });
      console.log(`Added product: ${product.name}`);
    }
    console.log("All products added successfully!");
  } catch (error) {
    console.error(
      "Error creating products:",
      error.response?.data || error.message
    );
  }
}

async function resetProducts() {
  await deleteAllProducts();
  await createProducts();
}

resetProducts();
