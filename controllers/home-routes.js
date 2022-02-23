const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/coding-challenges", (req, res) => {
  res.render("coding-challenges");
});

router.get("/interview-experiences", (req, res) => {
  res.render("interview-experiences");
});

router.get("/jobs", (req, res) => {
  res.render("jobs");
});

module.exports = router;
