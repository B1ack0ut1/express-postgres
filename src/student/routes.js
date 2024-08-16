import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.addStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.removeStudent);
export default router;
