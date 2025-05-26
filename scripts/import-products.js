const axios = require("axios");
const products = require("../products.json");
const STRAPI_URL = "https://strapi-project-g2z5.onrender.com/api/products";
const TOKEN =
  "59bbc0c2417f2864aaa44f6c191094c80de60a8ee269ce3cd81a097ab0f7f7668f51ad3ba29799517a1f0db5b373d8dc7ef4457aee7ce8fc42662ca15eaf66021dd59666bf47db094e0a198b716a541c068e6da1edecf7c415389c8cc200a6e585b507fdaa002f7bc6acbeed9b4257e8c9ed1b8c8d1e5a99ce1e1c2c2510dfc8";

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
