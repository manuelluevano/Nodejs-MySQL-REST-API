import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
  try {
    // throw new Error("Error server");
    const [rows] = await pool.query("SELECT * FROM companydb");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// obtener unico valor por id
export const getEmpleado = async (req, res) => {
  console.log(req.params.id);
  try {
    const [rows] = await pool.query("SELECT * FROM companydb WHERE id=?", [
      req.params.id,
    ]);
    console.log(rows);

    //validamos que exista registro
    if (rows.length === 0) {
      console.log("No existe valor");
      res.status(404).json({
        message: "Empleado no encontrado.",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// export const postEmpleados = (req, res) => res.send("Obteniendo Empleados");
export const postEmpleados = async (req, res) => {
  console.log(req.body);

  //extraemos los valoes que enviaremos
  const { name, salary } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO companydb (name, salary) VALUES (?,?)",
      [name, salary]
    );

    //ver los valores que envia desde post
    res.send({ id: rows.insertId, name, salary });
    //   res.send("Post Success ");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
export const updateEmpleados = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, salary } = req.body;

  console.log(id, name, salary);

  try {
    const [result] = await pool.query(
      "UPDATE companydb SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?;",
      [name, salary, id]
    );

    if (result.affectedRows === 0) {
      console.log("No se encuentra el elemento");
      res.status(404).json({
        message: "Empleado no encontrado.",
      });
    }

    // despues de actualizar el elemento, mostramos
    const [rows] = await pool.query("SELECT * FROM companydb WHERE id=?", [id]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const deleteEmpleados = async (req, res) => {
  try {
    // throw new Error("sever codec");
    const [result] = await pool.query("DELETE FROM companydb WHERE id=?", [
      req.params.id,
    ]);
    console.log({ result });
    // verificar que se haya elimindo correctamente el elemento
    if (result.affectedRows <= 0) {
      console.log("No se encuentra el elemento");
      res.status(404).json({
        message: "Empleado no encontrado.",
      });
    }
    res.sendStatus(204);

    //   res.json(affectedRows.affectedRows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};
