import { Router } from "express";
import { create, list, update, remove } from "../controllers/Product.controller";
import { verifyToken } from "../middlewares/authenticateJWT";

const router = Router();

/**
 * @swagger
 * /api-docs/products:
 *   get:
 *     summary: Baraanuudiin list
 *     responses:
 *       200:
 *         description: Paginate hiigdesen baraanuudiin list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Mongolz Sticker Bundle #Blitz
 *                       price:
 *                         type: number
 *                         example: 1000
 *       500:
 *         description: Server deer aldaa garlaa
 *   post:
 *     summary: Baraa nemeh
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mongolz Sticker Bundle #Blitz
 *               price:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Shine baraa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Mongolz Sticker Bundle #Blitz
 *                 price:
 *                   type: number
 *                   example: 1000
 *       500:
 *         description: Server deer aldaa garlaa
 */

router.get("/", list);
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

export default router;
