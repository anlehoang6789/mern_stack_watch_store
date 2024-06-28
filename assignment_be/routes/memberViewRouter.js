const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controllers/memberController");
const { requireAuth, requireAdmin } = require("../middleware/authenticated");

// Routes
memberRouter.post("/register", memberController.register);
memberRouter.post("/login", memberController.login);
memberRouter.get("/profile", requireAuth, memberController.showProfilePage);
memberRouter.get("/logout", memberController.logout);
memberRouter.post(
  "/:memberId/edit-profile",

  memberController.update
);
memberRouter.post(
  "/:memberId/change-password",

  memberController.changePassword
);
memberRouter.get(
  "/:memberId/edit-profile",

  memberController.showEditProfilePage
);
memberRouter.get(
  "/:memberId/change-password",

  memberController.showChangePasswordPage
);

// Admin routes
memberRouter.get("/accounts", memberController.getAllMembers);
memberRouter.delete("/:memberId", memberController.deleteMember);
memberRouter.get("/:memberId", memberController.getMemberById);

module.exports = memberRouter;
