import express from "express";
import empleadosRouter from "./routes/empleados.route.js";
import indexRouter from "./routes/index.route.js";

const app = express();

// obtenemos los valores de BODY, convertimos a json antes de que llegue a las rutas
app.use(express.json());

app.use(indexRouter);
app.use("/api", empleadosRouter);

// SI EL NAVEGADOR NO ENCUENTRA NINGUNA DE LAS RUTAS ANTERIORES
app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});
export default app;
