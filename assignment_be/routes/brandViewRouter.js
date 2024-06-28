const express = require("express");
const brandRouter = express.Router();
const brandController = require("../controllers/brandController");
const { requireAdmin } = require("../middleware/authenticated");

// Routes
brandRouter.post("/", brandController.createBrand);
brandRouter.get("/", brandController.getAllBrands);
brandRouter.put("/:brandId", brandController.updateBrand);
brandRouter.delete("/:brandId", brandController.deleteBrand);

// Render Pages
brandRouter.get("/new", requireAdmin, brandController.renderAddPage);
brandRouter.get("/:brandId", requireAdmin, brandController.renderEditPage);

module.exports = brandRouter;
