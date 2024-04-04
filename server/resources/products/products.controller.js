const initStripe = require("../../stripe");

async function getProducts(req, res) {
  const stripe = initStripe();
  try {
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });
    res.json(prices.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal server error 🥲");
  }
}

module.exports = { getProducts };
