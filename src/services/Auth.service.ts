import prisma from "../database/index";

export const getListOfUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
}

export const registerUser = async (email: string, name: string, password: string, age: number) => {
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) throw new Error("Ийм хэрэглэгч бүртгэлтэй байна!");

  const user = await prisma.users.create({
    data: { email, name, password, age },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  return user;
};

export const deleteUser = async (id: number) => {
  return prisma.users.delete({ where: { id } });
};