import { Request, Response, NextFunction } from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../services/Product.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getProducts();
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price } = req.body;
    const product = await createProduct(name, price);
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};


export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await updateProduct(Number(id), name, price);
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
