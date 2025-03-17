import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import prisma from "../database/index";
import { decrypt, encrypt } from "../utils/encruption";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "SecretKey";

export const getListOfUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
}

export const registerUser = async (email: string, name: string, password: string, age: number) => {
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) throw new Error("Ийм хэрэглэгч бүртгэлтэй байна!");

  const encryptedPassword = await encrypt(password);

  const user = await prisma.users.create({
    data: { email, name, password: encryptedPassword, age },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("Ийм бүртгэл олдсонгүй");

  try {
    const decryptedPassword = decrypt(user.password);
    if (decryptedPassword !== password) throw new Error("Нууц үг буруу байна!");
  } catch (error) {
    throw new Error("Нууц үг баталгаажуулалт алдаа гарлаа.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  return { token, user };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};


export const deleteUser = async (id: number) => {
  return prisma.users.delete({ where: { id } });
};