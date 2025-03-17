import { Router } from "express";
import ProductRouter from "./Product.router"
import AuthRouter from "./Auth.router"

const router = Router()
router.use("/products", ProductRouter);
router.use("/auth", AuthRouter);

export default router;