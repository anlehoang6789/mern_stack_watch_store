const express = require("express");
const watchRouter = express.Router();
const { requireAuth, requireAdmin } = require("../middleware/authenticated");
const watchController = require("../controllers/watchController");

// Render form to add new watch
watchRouter.get("/new", watchController.createWatchForm);

watchRouter
  .route("/")
  .get(watchController.getAllWatches)
  .post(watchController.createWatch);

watchRouter.get("/search", watchController.searchWatchByName);

watchRouter
  .route("/:id")
  .get(watchController.getWatchById)
  .put(watchController.updateWatch)
  .delete(watchController.deleteWatch);

watchRouter.get("/brand/:brandId", watchController.filterWatchesByBrand);

watchRouter.route("/:id/comment").post(watchController.submitComment);

watchRouter.get("/:id/edit", watchController.renderEditPage);

module.exports = watchRouter;
