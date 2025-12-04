import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
};

export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: "Error al crear tarea" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar tarea" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Tarea eliminada" });
    } catch (err) {
        res.status(400).json({ error: "Error al eliminar tarea" });
    }
};
