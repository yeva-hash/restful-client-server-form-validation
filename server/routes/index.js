import express from "express";
import bicycleRouter  from "./bicycleRouter.js";

const router = express.Router();

router.use('/bicycle', bicycleRouter);

export default router;

