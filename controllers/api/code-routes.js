const router = require("express").Router();
const { Code, User, Comment, Vote } = require("../../models");
const { sequelize } = require("../../models/user");
const withAuth = require("../../utils/auth");

// GET all Code route
router.get("/", (req, res) => {
  console.log("<3<3<3<3<3<3<3<3<3<3<3<3<3<3");
  Code.findAll({
    attributes: [
      "id",
      "title",
      "code_url",
      "user_id",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE code.id = vote.code_id)"
        ),
        "vote_count",
      ],
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attribute: ["id", "comment_text", "code_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCodeData) => res.json(dbCodeData))
    .catch((err) => {
      console.log(err);
      res.status(418).json(err);
    });
});

// GET single Code route
router.get("/:id", withAuth, (req, res) => {
  Code.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "title",
      "code_url",
      "user_id",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE code.id = vote.code_id)"
        ),
        "vote_count",
      ],
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attribute: ["id", "comment_text", "code_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbCodeData) => {
      if (!dbCodeData) {
        res.status(404).json({ message: "No challenge found with this ID" });
        return;
      }
      res.json(dbCodeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(418).json(err);
    });
});

// POST new Code route
router.post("/", (req, res) => {
  Code.create({
    title: req.body.title,
    code_url: req.body.code_url,
    user_id: req.session.user_id,
  })
    .then((dbCodeData) => res.json(dbCodeData))
    .catch((err) => {
      console.log(err);
      res.status(418).json(err);
    });
});

// PUT upvote Code route
router.put("/upvote", withAuth, (req, res) => {
  Vote.create({
    user_id: req.session.user_id,
    code_id: req.body.code_id,
  })
    .then((dbCodeData) => res.json(dbCodeData))
    .catch((err) => res.json(err));
});

// PUT update Code route
router.put("/:id", withAuth, (req, res) => {
  Code.update(
    {
      title: req.body.title,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((dbCodeData) => {
      if (!dbCodeData) {
        res.status(404).json({ message: "No challenge found with whis id" });
        return;
      }
      res.json(dbCodeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(418).json(err);
    });
});

// DELETE remove Code route
router.delete("/:id", withAuth, (req, res) => {
  Code.destroy({
    where: { id: req.params.id },
  })
    .then((dbCodeData) => {
      if (!dbCodeData) {
        res.status(404).json({ message: "No challenge found with whis id" });
        return;
      }
      res.json(dbCodeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(418).json(err);
    });
});

module.exports = router;
