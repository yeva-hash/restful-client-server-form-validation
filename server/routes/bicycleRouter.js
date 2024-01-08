import express from "express";
import bicycleController from "../controllers/bicycleController.js";

const router = express.Router();

router.get('/', bicycleController.getAll);
router.post('/', bicycleController.create, bicycleController.getAll);
router.patch('/:ID', bicycleController.updateStatus, bicycleController.getAll);
router.delete('/:ID', bicycleController.delete, bicycleController.getAll);

export default router;