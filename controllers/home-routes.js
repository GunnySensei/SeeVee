const router = require("express").Router();
const { Code, User, Job, Interview, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/coding-challenges", withAuth, (req, res) => {
  Code.findAll({
    include: [
      {
        model: Comment,
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
      const challenges = dbCodeData.map((challenge) =>
        challenge.get({ plain: true })
      );

      res.render("coding-challenges", {
        challenges,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/interview-experiences", withAuth, (req, res) => {
  Interview.findAll({
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "interview_id",
          "user_id",
          "created_at",
        ],
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
    .then((dbInterviewData) => {
      const interviews = dbInterviewData.map((interview) =>
        interview.get({ plain: true })
      );

      res.render("interview-experiences", {
        interviews,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/jobs", withAuth, (req, res) => {
  Job.findAll({
    include: [
      {
        model: Comment,
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
    .then((dbJobData) => {
      const postings = dbJobData.map((post) => post.get({ plain: true }));

      res.render("jobs", {
        postings,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
