import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser, getListOfUsers, deleteUser } from "../services/Auth.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getListOfUsers();
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, age } = req.body;

    if (!email || !name || !password || !age) {
      return res.status(400).json({ message: "Мэдээлэл дутуу байна гүйцээж бөгөлнө үү!!!" });
    }

    const user = await registerUser(email, name, password, age);
    res.status(201).json({ success: true, user, message: "Хэрэглэгч амжилттай бүртгэгдлээ!" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email болон нууц үгээ оруулна уу!!!" });
    }

    const result = await loginUser(email, password);
    res.json({ success: true, data: result, message: "Нэвтрэх амжилттай" });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteUser(Number(id));
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};