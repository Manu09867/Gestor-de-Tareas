import express from "express";
const router = express.Router();
import User from "../models/UserModel.js";

// GET all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// GET one user
router.get("/:username", async (req, res) => {
    const u = await User.findOne({ username: req.params.username });
    res.json(u);
});

// POST create user
router.post("/", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });

    await newUser.save();
    res.json({ message: "User created", user: newUser });
});

// PUT update user
router.put("/:username", async (req, res) => {
    const updated = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body,
        { new: true }
    );

    res.json(updated);
});

// DELETE user
router.delete("/:username", async (req, res) => {
    await User.findOneAndDelete({ username: req.params.username });
    res.json({ message: "User deleted" });
});

export default router;
