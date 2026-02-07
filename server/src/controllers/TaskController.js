const Task = require("../models/taskModel");

//Create a new Task
const create = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const task = new Task({ title, body });

    await task.save();

    return res.status(201).json({
      message: "Task created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//View all Tasks
const viewTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    if (!tasks) {
      return res.status(404).json({
        message: "No Tasks found.",
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

//View Task by Id
const viewTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

//Update a Task
const updateTaskById = async (req, res, next) => {
  try {
    const { title, body, completed } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const { id } = req.params;

    const updateTask = await Task.findByIdAndUpdate(
      id,
      { title, body, completed },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//Delete a Task
const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  viewTasks,
  viewTaskById,
  updateTaskById,
  deleteTaskById,
};
