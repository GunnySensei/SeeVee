const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const codeChallengeRoutes = require("./code-challenge-routes");
const jobPostingRoutes = require("./job-post-routes");
const interviewRoutes = require("./interview-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/codes", codeChallengeRoutes);
router.use("/jobs", jobPostingRoutes);
router.use("/interviews", interviewRoutes);

module.exports = router;
