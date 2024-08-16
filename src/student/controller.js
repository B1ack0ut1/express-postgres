import pool from "../../db.js";
import queries from "./queries.js";

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id is a number
  if (!isNumber(id)) res.status(400).send("Invalid request");

  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // Check if email already exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
    } else {
      // Add student to db
      pool.query(
        queries.addStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Student created successfully.");
          console.log(`Student ${id} created.`);
        }
      );
    }
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  // Check if id is a number
  if (!isNumber(id)) res.status(400).send("Invalid request");

  pool.query(queries.removeStudent, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Student does not exist.");
    } else {
      res.send("Student removed sucessfully.");
      console.log(`Student ${id} removed.`);
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;

    if (noStudentFound) {
      res.send("Student does not exist.");
    } else {
      pool.query(queries.updateStudent, [name, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated successfully.");
        console.log(`Student ${id} updated.`);
      });
    }
  });
};

const controller = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};

export default controller;
