import Task from "../models/Task.js";

/**
 * Retrieves all tasks for the authenticated user.
 * @async
 * @function getTasks
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No pudimos obtener tus tareas, inténtalo más tarde" });
  }
};

/**
 * Creates a new task for the authenticated user.
 * @async
 * @function createTask
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

export const createTask = async (req, res) => {
  try {
    const { title, details, status = "Por Hacer" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    const newTask = new Task({
      title,
      details,
      status,
      user: req.user.id,
    });
   const savedTask = await newTask.save();
    console.log('Task created successfully:', savedTask); // Para debugging
    res.status(201).json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "No pudimos crear tu tarea" });
  }
};

/**
 * Deletes a task by its ID.
 * @async
 * @function deleteTask
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Updates an existing task by its ID.
 * @async
 * @function updateTask
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

export const updateTask = async (req, res) => {
  try {
    const { title, details, status } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, details, status },
      { new: true }
    );
    if (!taskUpdated) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.status(200).json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: "No pudimos actualizar tu tarea"  });
  }
};

/**
 * Retrieves a single task by its ID.
 * @async
 * @function getTask
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ message: "No pudimos encontrar tu tarea" });
    return res.json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No pudimos encontrar tu tarea" });
  }
};
