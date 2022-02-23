const router = require("express").Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
