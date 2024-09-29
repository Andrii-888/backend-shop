const router = require("express").Router();
const db = require("../../models");
const deepl = require("deepl-node");

const authKey = process.env.AUTH_KEY;
const translator = new deepl.Translator(authKey);

const deeplTranslater = async (arrText, lang) => {
  const result = await translator.translateText(arrText, null, lang);
  const updateResult = await result.map(({ text }) => text);
  console.log(updateResult);
  return updateResult;
};

router.get("/", async (request, response) => {
  try {
    const { lang, category } = request.query;

    // Если категория не указана, не используем фильтр по категории
    const filter = {
      lang: lang,
    };

    if (category) {
      const categoryRegex = new RegExp(category, "i");
      filter.subCategory = { $regex: categoryRegex };
    }

    const products = await db.Product.find(filter);

    // if (lang !== "en") {
    //   const productsForTranslation = await Promise.all(
    //     products.map(
    //       async ({
    //         title,
    //         description,
    //         material,
    //         category,
    //         subCategory,
    //         sizes,
    //         price,
    //         image,
    //         productCode,
    //         _id,
    //         rating,
    //         availabileSize,
    //         isFavorite,
    //       }) => {
    //         try {
    //           // Перевод основных полей продукта
    //           const [
    //             translatedTitle,
    //             translatedMaterial,
    //             translatedCategory,
    //             // translatedSubCategory,
    //           ] = await deeplTranslater(
    //             [title, material, category],
    //             lang
    //           );

    //           const translatedDescription = await deeplTranslater(
    //             description,
    //             lang
    //           );

    //           // Перевод полей sizes
    //           const translatedSizes = await Promise.all(
    //             Object.keys(sizes).map(async (key) => {
    //               const size = sizes[key];
    //               const translatedSizeTitle = await deeplTranslater(
    //                 [size.title],
    //                 lang
    //               );
    //               return {
    //                 ...size,
    //                 title: translatedSizeTitle[0],
    //               };
    //             })
    //           );

    //           // Преобразование массива обратно в объект
    //           const translatedSizesObject = Object.keys(sizes).reduce(
    //             (acc, key, index) => {
    //               acc[key] = translatedSizes[index];
    //               return acc;
    //             },
    //             {}
    //           );

    //           return {
    //             price,
    //             image,
    //             productCode,
    //             _id,
    //             rating,
    //             availabileSize,
    //             isFavorite,
    //             subCategory,
    //             title: translatedTitle,
    //             description: translatedDescription,
    //             material: translatedMaterial,
    //             category: translatedCategory,
    //             sizes: translatedSizesObject,
    //           };
    //         } catch (error) {
    //           console.error("Error translating product:", error);
    //           throw error;
    //         }
    //       }
    //     )
    //   );

    //   console.log(productsForTranslation);

    //   response.json(productsForTranslation);

    //   return;
    // }
    
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (request, response) => {
  try {
    const product = await db.Product.findById(request.params.id);
    if (!product) {
      response.status(404).json({ message: "product not found" });
      return;
    }
    response.json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
