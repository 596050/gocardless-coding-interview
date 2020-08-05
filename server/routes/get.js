const express = require("express");

const { getHealth } = require("../controllers/health");

const router = express.Router();

router.get("/health", getHealth);

exports.healthRoutes = router;
