import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      const wrappedData = data.map((item: any) => ({
        id: item.id,
        attributes: {
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category,
          rating: item.rating,
          reviewCount: item.reviewCount,
          image: item.image,
          imageList: item.imageList,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          publishedAt: item.publishedAt,
          documentId: item.documentId,
          // add other fields if needed
        },
      }));

      return { data: wrappedData, meta };
    },
  })
);
