const initStripe = require("../../stripe");

async function getProducts(req, res) {
  const stripe = initStripe();
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });
    res.json(products.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal server error 🥲");
  }
}

module.exports = { getProducts };
