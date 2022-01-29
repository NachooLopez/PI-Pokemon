const { Router } = require("express");
const { getTypes } = require("./functions/index");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const types = await getTypes();
    res.json(types);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
