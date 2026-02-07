const express = require("express");
const router = express.Router();
const {
  create,
  viewTasks,
  viewTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/TaskController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, create);
router.get("/", protect, viewTasks);
router.get("/:id", protect, viewTaskById);
router.put("/:id", protect, updateTaskById);
router.delete("/:id", protect, deleteTaskById);

module.exports = router;
