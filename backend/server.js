import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// 👉 Importar las rutas de usuarios
import userRoutes from "./routes/users.js";

// 👉 Importar las rutas de tareas
import taskRoutes from "./routes/taskRoutes.js";

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error al conectar MongoDB:", err));

// 👉 Usar las rutas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(process.env.PORT, () =>
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
